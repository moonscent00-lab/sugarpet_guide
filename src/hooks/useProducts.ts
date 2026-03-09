import { useState, useEffect } from 'react';
import { Product, API_URL } from '../data/products';

// ✅ 실제 구글 시트 헤더 기준 (한글 컬럼명)
interface ApiRow {
    // 기본 재고 시트 컬럼
    바코드?: string | number;
    상품명?: string;
    상품분류?: string;
    구매처?: string;
    매입가?: number | string;
    판매가?: number | string;
    현재재고?: number | string;
    적정재고?: number | string;
    상태?: string;

    // 급여량 계산기에 필요한 추가 컬럼 (시트에 추가 권장)
    브랜드?: string;
    설명?: string;
    칼로리?: number | string;   // kcalPerKg — 없으면 기본값 3500 사용
    종류?: string;              // '강아지' 또는 '고양이' — 없으면 상품분류로 추정
    이미지URL?: string;         // 이미지 직접 링크
    태그?: string;
    핵심성분?: string;

    // 기타 알 수 없는 컬럼 허용
    [key: string]: unknown;
}

function guessPetType(분류: string): 'dog' | 'cat' {
    const v = 분류.toLowerCase();
    if (v.includes('고양이') || v.includes('캣') || v.includes('cat') || v.includes('냥')) return 'cat';
    if (v.includes('강아지') || v.includes('독') || v.includes('dog') || v.includes('견')) return 'dog';
    return 'dog'; // 판단 불가 시 기본값
}

function normalizeProduct(row: ApiRow, index: number): Product {
    // 상품명
    const name = String(row.상품명 || '');

    // 브랜드 — 없으면 구매처로 대체
    const brand = String(row.브랜드 || row.구매처 || '');

    // 설명 — 없으면 상품분류로 대체
    const description = String(row.설명 || row.상품분류 || '');

    // 핵심성분
    const keyIngredients = String(row.핵심성분 || '');

    // 칼로리 — 없으면 기본값 3500 (kcal/kg)
    const rawKcal = row.칼로리 ?? 3500;
    const kcalPerKg = typeof rawKcal === 'string'
        ? parseInt(rawKcal.replace(/[^0-9]/g, ''), 10) || 3500
        : Number(rawKcal) || 3500;

    // petType — 종류 컬럼 우선, 없으면 상품분류에서 추정
    const rawType = String(row.종류 || row.상품분류 || '');
    const petType: 'dog' | 'cat' = guessPetType(rawType);

    // 이미지 URL
    const imageUrl = String(row.이미지URL || '');

    // 태그 — 상품분류를 쉼표/슬래시로 분리
    const rawTags = String(row.태그 || row.상품분류 || '');
    const tags = rawTags.split(/[,/]/).map(t => t.trim()).filter(Boolean);

    // id — 바코드 우선, 없으면 이름 기반 생성
    const id = String(row.바코드 || '').trim()
        || `product-${brand}-${name}-${index}`.replace(/\s+/g, '-').toLowerCase();

    return {
        id,
        brand,
        name,
        description,
        kcalPerKg,
        petType,
        imageUrl: imageUrl || undefined,
        tags: tags.length > 0 ? tags : undefined,
        keyIngredients: keyIngredients || undefined,
    };
}

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_URL}?api=true&t=${Date.now()}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`서버 응답 오류: ${response.status}`);
                }

                const data = await response.json();
                if (cancelled) return;

                // 배열 or { data: [...] } or { products: [...] } 모두 처리
                const rows: ApiRow[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data.products)
                            ? data.products
                            : [];

                // 빈 배열이어도 에러가 아님 — 빈 목록으로 표시
                const normalized = rows
                    .filter(row => row.상품명)   // 상품명 없는 행은 건너뜀
                    .map((row, idx) => normalizeProduct(row, idx));

                setProducts(normalized);
            } catch (err) {
                if (cancelled) return;
                console.error('[useProducts] 구글 시트 연동 에러:', err);

                let message = '구글 시트 연동 에러';
                if (err instanceof Error) {
                    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                        message = '구글 시트 연동 에러: 네트워크 연결 또는 CORS 문제 (API URL을 확인해주세요)';
                    } else if (err.message.includes('JSON')) {
                        message = '구글 시트 연동 에러: JSON 파싱 실패 (API가 JSON을 반환하는지 확인해주세요)';
                    } else {
                        message = `구글 시트 연동 에러: ${err.message}`;
                    }
                }
                setError(message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProducts();
        return () => { cancelled = true; };
    }, [fetchTrigger]);

    const refetch = () => setFetchTrigger(prev => prev + 1);
    return { products, loading, error, refetch };
}
