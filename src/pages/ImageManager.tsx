import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImages } from '../hooks/useImages';
import { PRODUCTS } from '../data/products';
import { Image, Link as LinkIcon, Save, ChevronLeft } from 'lucide-react';

export default function ImageManager() {
    const navigate = useNavigate();
    const { images, saveImage } = useImages();
    const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');

    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
    const [inputValue, setInputValue] = useState('');

    const handleSave = () => {
        if (!inputValue) return;
        saveImage(selectedProduct, inputValue);
        alert('이미지가 성공적으로 저장되었습니다.');
        setInputValue('');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result as string;
            setInputValue(base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ paddingTop: '20px' }}>
            <button
                onClick={() => navigate(-1)}
                className="btn"
                style={{ padding: '8px 0', marginBottom: '16px', color: 'var(--text-secondary)' }}
            >
                <ChevronLeft size={20} /> 뒤로가기
            </button>

            <h2 style={{ marginBottom: '24px' }}>슈가펫 이미지 관리자</h2>

            <div style={{ backgroundColor: 'var(--surface)', padding: '20px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                        상품 선택
                    </label>
                    <select
                        value={selectedProduct}
                        onChange={e => setSelectedProduct(e.target.value)}
                        style={{
                            width: '100%', padding: '12px',
                            borderRadius: '8px', border: '1px solid var(--border)',
                            backgroundColor: '#fff', fontSize: '16px'
                        }}
                    >
                        {PRODUCTS.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                        <option value="kibble-petoria-classic-pollack-lamb">알갱이: 한끼뚝딱 황태양고기</option>
                        <option value="kibble-sugarpet-premium-salmon">알갱이: 슈가펫 연어</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button
                        className={`btn ${activeTab === 'url' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '10px' }}
                        onClick={() => setActiveTab('url')}
                    >
                        <LinkIcon size={18} style={{ marginRight: '8px' }} /> URL 입력
                    </button>
                    <button
                        className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, padding: '10px' }}
                        onClick={() => setActiveTab('upload')}
                    >
                        <Image size={18} style={{ marginRight: '8px' }} /> 파일 업로드
                    </button>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    {activeTab === 'url' ? (
                        <input
                            type="text"
                            placeholder="이미지 URL을 붙여넣으세요"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            style={{
                                width: '100%', padding: '12px',
                                borderRadius: '8px', border: '1px solid var(--border)',
                                fontSize: '16px'
                            }}
                        />
                    ) : (
                        <div style={{
                            border: '2px dashed var(--border)',
                            borderRadius: '8px',
                            padding: '30px',
                            textAlign: 'center',
                            backgroundColor: '#FAFAFC'
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                id="file-upload"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                                <Image size={18} style={{ marginRight: '8px' }} />
                                사진 선택하기
                            </label>
                        </div>
                    )}
                </div>

                {inputValue && (
                    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>미리보기</p>
                        <img
                            src={inputValue}
                            alt="Preview"
                            style={{
                                maxWidth: '100%', maxHeight: '200px',
                                objectFit: 'contain', borderRadius: '8px',
                                border: '1px solid var(--border)'
                            }}
                        />
                    </div>
                )}

                <button
                    onClick={handleSave}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={!inputValue}
                >
                    <Save size={18} style={{ marginRight: '8px' }} />
                    현재 상품 이미지로 저장
                </button>
            </div>
        </div>
    );
}
