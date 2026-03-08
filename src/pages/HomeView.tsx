import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useImages } from '../hooks/useImages';

export default function HomeView() {
    const { getImage } = useImages();

    return (
        <div style={{ paddingTop: '20px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px', lineHeight: 1.2 }}>
                    우리 아이를 위한<br />
                    <span style={{ color: 'var(--primary)' }}>정확한 급여량</span> 계산
                </h1>
                <p>몸무게와 활동량에 맞는 권장 사료량을 확인하세요.</p>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {PRODUCTS.map(product => (
                    <div key={product.id} style={{
                        backgroundColor: 'var(--surface)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '20px',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        transition: 'transform var(--transition-fast)'
                    }}>
                        <img
                            src={getImage(product.id)}
                            alt={product.name}
                            style={{
                                width: '80px', height: '80px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                backgroundColor: '#F5F5F7'
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '4px' }}>
                                {product.brand}
                            </p>
                            <h3 style={{ fontSize: '16px', marginBottom: '4px', lineHeight: 1.3 }}>
                                {product.name}
                            </h3>
                            <p style={{ fontSize: '13px', marginBottom: '12px' }}>
                                {product.description}
                            </p>
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px', width: '100%' }}>
                                    급여량 계산하기
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
