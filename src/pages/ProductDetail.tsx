import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useImages } from '../hooks/useImages';
import { useProducts } from '../hooks/useProducts';
import { calculateFeedingAmount, calculateCups, LifeStage } from '../utils/calculator';
import { ChevronLeft, Info, Utensils } from 'lucide-react';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getImage } = useImages();
    const { products } = useProducts();

    const product = products.find(p => p.id === id);
    const [weight, setWeight] = useState<number>(5);
    const [lifeStage, setLifeStage] = useState<LifeStage>('adult_neutered');
    const [resultGrams, setResultGrams] = useState<number | null>(null);

    if (!product) return <div>상품을 찾을 수 없습니다.</div>;

    const handleCalculate = () => {
        const grams = calculateFeedingAmount(weight, lifeStage, product.kcalPerKg);
        setResultGrams(grams);
    };

    return (
        <div style={{ paddingTop: '16px' }}>
            <button
                onClick={() => navigate(-1)}
                className="btn"
                style={{ padding: '8px 0', marginBottom: '16px', color: 'var(--text-secondary)' }}
            >
                <ChevronLeft size={20} /> 리스트로 돌아가기
            </button>

            <div style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '24px'
            }}>
                <img
                    src={getImage(product.id)}
                    alt={product.name}
                    style={{ width: '100%', height: 'auto', aspectRatio: '1', objectFit: 'contain', backgroundColor: '#FAFAFC' }}
                />
                <div style={{ padding: '24px' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}>{String(product.brand || '')}</p>
                    <h2 style={{ fontSize: '22px', marginBottom: '8px', lineHeight: 1.3 }}>{String(product.name || '')}</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{String(product.description || '')}</p>
                </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Utensils size={20} style={{ marginRight: '8px', color: 'var(--primary)' }} />
                    맞춤 급여량 계산기
                </h3>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                        반려동물 몸무게 (kg)
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(Number(e.target.value))}
                        style={{
                            width: '100%', padding: '16px',
                            borderRadius: '12px', border: '1px solid var(--border)',
                            fontSize: '18px', fontWeight: 500, backgroundColor: '#FAFAFC'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                        생애 주기 (Life Stage)
                    </label>
                    <select
                        value={lifeStage}
                        onChange={e => setLifeStage(e.target.value as LifeStage)}
                        style={{
                            width: '100%', padding: '16px',
                            borderRadius: '12px', border: '1px solid var(--border)',
                            fontSize: '16px', fontWeight: 500, backgroundColor: '#FAFAFC',
                            appearance: 'none'
                        }}
                    >
                        <option value="puppy_under_4m">강아지 (4개월 미만)</option>
                        <option value="puppy_over_4m">강아지 (4개월 이상)</option>
                        <option value="adult_intact">성견 (중성화 안함)</option>
                        <option value="adult_neutered">성견 (중성화 완료)</option>
                        <option value="senior">노령견</option>
                        <option value="weight_loss">체중 감량 필요</option>
                    </select>
                </div>

                <button
                    onClick={handleCalculate}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '16px' }}
                >
                    급여량 계산하기
                </button>

                {resultGrams !== null && (
                    <div style={{
                        marginTop: '24px', padding: '20px',
                        backgroundColor: 'var(--primary)', color: 'white',
                        borderRadius: '16px', textAlign: 'center',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        animation: 'fadeIn 0.3s ease-out'
                    }}>
                        <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>하루 권장 급여량</p>
                        <div style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px' }}>
                            {resultGrams}g
                        </div>

                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '16px 0' }} />

                        <p style={{ fontSize: '15px', fontWeight: 600 }}>
                            슈가펫 종이컵 기준 약 <span style={{ fontSize: '20px', fontWeight: 800 }}>{calculateCups(resultGrams)}</span>컵
                        </p>
                    </div>
                )}
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FAFAFC', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-main)' }}>
                    🔍 알갱이 크기 비교 (Kibble Size)
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                    실제 알갱이 크기를 10원 동전(18mm)과 비교해보세요.
                </p>

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
                    padding: '24px', backgroundColor: 'white', borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%',
                            backgroundColor: '#B87333', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '14px', marginBottom: '8px',
                            border: '2px solid #8B4513'
                        }}>
                            10원<br />(18mm)
                        </div>
                    </div>
                    <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }} />
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={getImage(`kibble-${product.id}`)}
                            alt="Kibble"
                            style={{ width: '50px', height: '50px', objectFit: 'contain', marginBottom: '8px' }}
                        />
                        <p style={{ fontSize: '12px', fontWeight: 600 }}>실제 사료</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
