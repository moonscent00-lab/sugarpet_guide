import { useState, useEffect } from 'react';
import { Product, API_URL } from '../data/products';

interface ApiRow {
    // 한글 필드명 (구글 시트 헤더 기준)
    id?: string;
    브랜드?: string;
    brand?: string;
    이름?: string;
    name?: string;
    설명?: string;
    description?: string;
    칼로리?: number | string;
    kcalPerKg?: number | string;
    종류?: string;
    petType?: string;
    이미지URL?: string;
    imageUrl?: string;
    태그?: string;
    tags?: string;
    핵심성분?: string;
    keyIngredients?: string;
}

function normalizeProduct(row: ApiRow, index: number): Product {
    const brand = row.브랜드 || row.brand || '';
    const name = row.이름 || row.name || '';
    const description = row.설명 || row.description || '';
    const keyIngredients = row.핵심성분 || row.keyIngredients || '';

    // kcalPerKg: 한/영 필드 모두 시도, 숫자 변환
    const rawKcal = row.칼로리 ?? row.kcalPerKg ?? 3500;
    const kcalPerKg = typeof rawKcal === 'string' ? parseInt(rawKcal.replace(/[^0-9]/g, ''), 10) || 3500 : Number(rawKcal) || 3500;

    // petType: 한/영 모두 처리
    const rawType = row.종류 || row.petType || '';
    const petType: 'dog' | 'cat' = (
        rawType === 'cat' ||
        rawType === '고양이' ||
        rawType === '猫' ||
        rawType.toLowerCase().includes('cat')
    ) ? 'cat' : 'dog';

    // 이미지URL: 한글 필드명 우선 (사용자가 명시)
    const imageUrl = row.이미지URL || row.imageUrl || '';

    // 태그: 쉼표 구분 문자열 → 배열 변환
    const rawTags = row.태그 || row.tags || '';
    const tags = typeof rawTags === 'string'
        ? rawTags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    // id: 없으면 브랜드+이름 기반으로 생성
    const id = row.id || `product-${brand}-${name}-${index}`.replace(/\s+/g, '-').toLowerCase();

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
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`서버 응답 오류: ${response.status}`);
                }

                const data = await response.json();

                if (cancelled) return;

                // 응답이 배열 혹은 { data: [...] } 형태 모두 처리
                const rows: ApiRow[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data.products)
                            ? data.products
                            : [];

                if (rows.length === 0) {
                    throw new Error('API에서 제품 데이터를 불러오지 못했습니다. 구글 시트를 확인해주세요.');
                }

                const normalized = rows.map((row, idx) => normalizeProduct(row, idx));
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

        return () => {
            cancelled = true;
        };
    }, [fetchTrigger]);

    const refetch = () => setFetchTrigger(prev => prev + 1);

    return { products, loading, error, refetch };
}
