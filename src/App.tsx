import React, { useState, useEffect, useRef } from 'react';
import { Calculator, MapPin, Search, ChevronRight, MessageCircle, Dog, Cat, X, Edit3, Save } from 'lucide-react';
import { Product } from './data/products';
import { useImages } from './hooks/useImages';
import { useProducts } from './hooks/useProducts';
import ProcessedLogo from './components/ProcessedLogo';
import AdminLogin from './components/AdminLogin';
import './index.css';

const safeRenderString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(safeRenderString).join(', ');
  if (typeof value === 'object') return ''; // 객체는 무조건 렌더링 차단 (에러 방지)
  return String(value);
};

const MULTIPLIERS = {
  dog: {
    puppy: 3.0,
    adult: 1.6,
    senior: 1.2
  },
  cat: {
    kitten: 2.5,
    adult: 1.2,
    senior: 1.1
  }
};

const STAGE_LABELS = {
  puppy: '퍼피 (1세 미만)',
  kitten: '키튼 (1세 미만)',
  adult: '어덜트 (1~7세)',
  senior: '시니어 (7세 이상)'
};

const renderCupVisual = (grams: number) => {
  const CUP_SIZE = 80;
  const fullCups = Math.floor(grams / CUP_SIZE);
  const remainder = grams % CUP_SIZE;
  const fraction = Math.round((remainder / CUP_SIZE) * 10);

  let desc = '';
  if (fullCups === 0) {
    if (fraction === 0) desc = `바닥에 아주 살짝만 깔리게 주시면 [${grams}g]입니다.`;
    else if (fraction === 5) desc = `종이컵 절반(5부) 정도 채우면 [${grams}g]입니다.`;
    else desc = `약 ${fraction}부 능선까지 채우면 [${grams}g]입니다.`;
  } else {
    if (remainder === 0) desc = `종이컵 가득 ${fullCups}컵을 주시면 [${grams}g]입니다.`;
    else if (fraction === 5) desc = `${fullCups}컵 가득 + 추가로 절반을 더 주시면 [${grams}g]입니다.`;
    else desc = `${fullCups}컵 가득 + 약 ${fraction}부 능선까지 채우면 [${grams}g]입니다.`;
  }

  const cupsArr = [];
  for (let i = 0; i < fullCups; i++) cupsArr.push(100);
  if (remainder > 0 || fullCups === 0) {
    cupsArr.push(remainder === 0 && fullCups === 0 ? 5 : (remainder / CUP_SIZE) * 100);
  }

  return { desc, cupsArr };
};

const ImageWithFallback = ({ src, alt, className, style, isPlaceholder, isModal }: any) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || isPlaceholder || !src) {
    if (isModal) {
      return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProcessedLogo className="app-main-logo" style={{ width: '120px', height: '120px' }} />
        </div>
      );
    }
    return (
      <div className={className} style={{ ...style, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ProcessedLogo className="app-main-logo" style={{ width: '40px', height: '40px' }} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  );
};

export default function App() {
  const { products, loading: productsLoading, error: productsError, refetch } = useProducts();
  const { getImage, saveImage, getKeyIngredients, saveKeyIngredients } = useImages();
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [weight, setWeight] = useState('');
  const [stage, setStage] = useState<'puppy' | 'kitten' | 'adult' | 'senior'>('adult');
  const [result, setResult] = useState<{ der: number, grams: number, cups: string } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<(Product & { todayGrams: number }) | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const resultRef = useRef<HTMLElement>(null);

  // Admin states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editKeyIngredients, setEditKeyIngredients] = useState('');

  const isAdmin = window.location.pathname === '/admin';

  useEffect(() => {
    if (petType === 'dog' && stage === 'kitten') setStage('puppy');
    if (petType === 'cat' && stage === 'puppy') setStage('kitten');
    setResult(null);
  }, [petType, stage]);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  if (isAdmin && !isAdminAuthenticated) {
    return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
  }

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;

    const rer = 70 * Math.pow(w, 0.75);
    const multiplier = petType === 'dog'
      ? MULTIPLIERS.dog[stage as keyof typeof MULTIPLIERS.dog]
      : MULTIPLIERS.cat[stage as keyof typeof MULTIPLIERS.cat];
    const der = rer * (multiplier || 1.6);

    // Average kcal/g fallback (Petoria Classic is 3.4, SugarPet is 3.6, let's use 3.5 as average for general)
    const avgKcalPerG = 3.5;
    const grams = Math.round(der / avgKcalPerG);
    const cups = (grams / 80).toFixed(1);

    setResult({
      der: Math.round(der),
      grams,
      cups
    });
    // Removed scrollIntoView to fix scroll jump bug
  };

  const handleSaveAdminEdit = () => {
    if (editingProduct) {
      if (editUrl.trim() !== '') {
        saveImage(editingProduct.id, editUrl);
      }
      saveKeyIngredients(editingProduct.id, editKeyIngredients);
      setEditingProduct(null);
    }
  };



  const currentProducts = products.filter(product => {
    if (product.petType !== petType) return false;

    const brandName = `${product.brand} ${product.name}`.toLowerCase();

    // Explicit All Life Stages
    const isExplicitAllStage =
      brandName.includes('전연령') ||
      brandName.includes('all life stages') ||
      brandName.includes('애터미 헤이 독') ||
      brandName.includes('애터미 헤이 캣');

    // Specific Age Markers
    const isPuppyKitten =
      brandName.includes('퍼피') ||
      brandName.includes('키튼') ||
      brandName.includes('스타터') ||
      brandName.includes('베이비') ||
      brandName.includes('주니어');

    const isAdult =
      brandName.includes('어덜트') ||
      brandName.includes('인도어') ||
      brandName.includes('웨이트케어');

    const isSenior =
      brandName.includes('시니어') ||
      brandName.includes('노령');

    // If it has NO age marker at all, treat it as All Life Stages so it doesn't mysteriously vanish from the DB checks
    const hasAnyAgeMarker = isPuppyKitten || isAdult || isSenior;
    const isAllStage = isExplicitAllStage || !hasAnyAgeMarker;

    // Also check Search Query
    const searchLower = searchQuery.toLowerCase().trim();
    if (searchLower) {
      const matchesName = product.name.toLowerCase().includes(searchLower);
      const matchesBrand = product.brand.toLowerCase().includes(searchLower);
      const matchesTag = product.tags?.some(tag => tag.toLowerCase().includes(searchLower));

      if (!matchesName && !matchesBrand && !matchesTag) {
        return false;
      }
    }

    if (isAllStage) return true;

    if (stage === 'puppy' || stage === 'kitten') return isPuppyKitten;
    if (stage === 'adult') return isAdult;
    if (stage === 'senior') return isSenior;

    return false;
  });

  return (
    <div className="app-container">
      {/* Header with Processed Transparent Logo */}
      <header className="header">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ProcessedLogo className="app-main-logo" />
        </div>
        <div className="location-badge">
          <MapPin size={14} /> 슈가펫 무인매장
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          사장님 없어도<br />
          당황하지 마세요.
        </h1>
        <p className="hero-subtitle">
          우리 아이 맞춤 급여량,<br />
          슈가펫이 <span className="highlight">1초 만에 계산</span>해 드립니다.
        </p>
      </section>

      {/* Calculator Form */}
      <section className="calculator-card">
        <div className="form-group">
          <label className="form-label">우리아이는?</label>
          <div className="type-toggle">
            <button
              className={`type-btn ${petType === 'dog' ? 'active' : ''}`}
              onClick={() => setPetType('dog')}
            >
              <Dog className="type-icon" />
              강아지
            </button>
            <button
              className={`type-btn ${petType === 'cat' ? 'active' : ''}`}
              onClick={() => setPetType('cat')}
            >
              <Cat className="type-icon" />
              고양이
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">몸무게는 얼마인가요?</label>
          <div className="weight-input-wrapper">
            <input
              type="number"
              className="weight-input"
              placeholder="예: 4.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="0.1"
              min="0"
            />
            <span className="weight-unit">kg</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">나이대(생애주기)를 선택해주세요</label>
          <div className="stage-grid">
            {petType === 'dog' ? (
              <button
                className={`stage-btn ${stage === 'puppy' ? 'active' : ''}`}
                onClick={() => setStage('puppy')}
              >
                {STAGE_LABELS['puppy']}
              </button>
            ) : (
              <button
                className={`stage-btn ${stage === 'kitten' ? 'active' : ''}`}
                onClick={() => setStage('kitten')}
              >
                {STAGE_LABELS['kitten']}
              </button>
            )}
            <button
              className={`stage-btn ${stage === 'adult' ? 'active' : ''}`}
              onClick={() => setStage('adult')}
            >
              {STAGE_LABELS['adult']}
            </button>
            <button
              className={`stage-btn ${stage === 'senior' ? 'active' : ''}`}
              onClick={() => setStage('senior')}
            >
              {STAGE_LABELS['senior']}
            </button>
          </div>
        </div>

        <button
          className="calc-btn"
          onClick={handleCalculate}
          disabled={!weight || parseFloat(weight) <= 0}
        >
          <Calculator size={20} /> 급여량 계산하기
        </button>
      </section>

      {/* Results */}
      {result && (
        <section className="result-section" ref={resultRef}>
          <div className="result-card">
            <div className="result-title">하루 권장 급여량</div>
            <div className="result-value">
              {result.grams} <span className="result-unit">g</span>
            </div>
            <div className="result-sub">
              종이컵 기준 약 {result.cups} 컵 분량
            </div>
          </div>

          <div className="rec-title">
            <Search size={18} color="var(--color-primary)" />
            사료 상품 리스트 및 맞춤 양 확인
          </div>

          <div className="search-bar-container" style={{ marginBottom: '20px', padding: '0 4px' }}>
            <div className="search-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '16px' }} />
              <input
                type="text"
                className="search-input"
                placeholder="사료 이름이나 특징을 검색해보세요 (예: 관절, 가수분해)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#fff',
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', color: 'var(--color-text-light)', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {searchQuery && currentProducts.length === 0 && !productsLoading && !productsError && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                검색 결과가 없습니다. 다른 키워드로 검색해보세요.
              </div>
            )}
          </div>

          {/* 로딩 상태 */}
          {productsLoading && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-light)' }}>
              <div style={{
                width: '40px', height: '40px', margin: '0 auto 16px',
                border: '3px solid var(--color-primary-light)',
                borderTopColor: 'var(--color-primary)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>사료 정보 불러오는 중...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {!productsLoading && productsError && (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <p style={{ fontSize: '0.9rem', color: '#e53e3e', marginBottom: '16px', lineHeight: 1.6 }}>
                ⚠️ 데이터를 불러오지 못했어요.<br />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{productsError}</span>
              </p>
              <button
                onClick={refetch}
                className="calc-btn"
                style={{ padding: '10px 24px', fontSize: '0.9rem', width: 'auto' }}
              >
                다시 시도하기
              </button>
            </div>
          )}

          <div className="rec-list">
            {!productsLoading && !productsError && currentProducts.map(product => {
              const kcalPerGram = product.kcalPerKg / 1000;
              const productGrams = Math.round(result.der / kcalPerGram);
              const imgUrl = getImage(product.id, product.imageUrl);
              const isPlaceholder = imgUrl === '/sugarpet-logo.png';

              const handleProductClick = () => {
                setSelectedProduct({ ...product, todayGrams: productGrams });
              };

              return (
                <div key={product.id} className="product-card clickable" onClick={handleProductClick}>
                  <ImageWithFallback
                    src={imgUrl}
                    alt={product.name}
                    className="product-icon"
                    style={{ objectFit: 'contain', backgroundColor: '#fdf6f8', padding: '4px' }}
                    isPlaceholder={isPlaceholder}
                  />

                  <div className="product-info">
                    <div className="product-brand">{safeRenderString(product.brand)}</div>
                    <div className="product-name">{safeRenderString(product.name)}</div>
                    <div className="product-feature">{safeRenderString(product.description)}</div>
                    {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
                      <div className="product-tags">
                        {product.tags.map(tag => typeof tag === 'string' ? (
                          <span key={tag} className="tag-chip">#{tag}</span>
                        ) : null)}
                      </div>
                    )}
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isAdmin && (
                      <button
                        className="btn-upload"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduct(product);
                          setEditUrl(isPlaceholder ? '' : imgUrl);
                          setEditKeyIngredients(getKeyIngredients(product.id) || product.keyIngredients || '');
                        }}
                        style={{ padding: '6px 10px', fontSize: '0.7rem', color: 'var(--color-primary)', borderColor: 'var(--color-primary)', background: 'var(--color-primary-light)' }}
                      >
                        <Edit3 size={14} /> 수정
                      </button>
                    )}
                    <div style={{ paddingLeft: isAdmin ? '8px' : '0', borderLeft: isAdmin ? '1px solid var(--color-border)' : 'none' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                        {productGrams}g
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>
                        상세가이드
                      </div>
                    </div>
                    <ChevronRight size={16} color="var(--color-text-light)" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      )}

      {/* Footer */}
      <footer className="footer">
        <a
          href="https://forms.gle/43dex1myxWPnt1Qs9"
          target="_blank"
          rel="noopener noreferrer"
          className="suggestion-btn"
        >
          <MessageCircle size={16} /> 찾으시는 상품이 없나요? 🐾 인절미 점장에게 입고 요청하기
        </a>
        <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
          © Sugar Pet. All rights reserved.<br />
          본 계산식은 기초대사량(RER) 기반 참고용 수치입니다.
        </div>
      </footer>

      {/* Product Details Modal (Cup Animation & Details) */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <span className="modal-brand">{safeRenderString(selectedProduct.brand)}</span>
              <h2 className="modal-product-name">{safeRenderString(selectedProduct.name)}</h2>
              <p className="modal-product-feature">{safeRenderString(selectedProduct.description)}</p>

              <div style={{ marginTop: '16px', padding: '16px', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-primary)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '6px' }}>[핵심 성분 요약]</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.5, fontWeight: 500, whiteSpace: 'pre-line' }}>
                  {safeRenderString(getKeyIngredients(selectedProduct.id) || selectedProduct.keyIngredients) || safeRenderString(selectedProduct.description)}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-image-wrapper package-wrapper" style={{ height: '320px', border: 'none', background: 'transparent' }}>
                <ImageWithFallback
                  src={getImage(selectedProduct.id, selectedProduct.imageUrl)}
                  alt="Package"
                  className="modal-image"
                  style={{ objectFit: 'contain', height: '100%', padding: '16px' }}
                  isPlaceholder={getImage(selectedProduct.id, selectedProduct.imageUrl) === '/sugarpet-logo.png'}
                  isModal={true}
                />
                <div className="image-label">제품 패키지 (터치 시 변경)</div>
              </div>



              <div className="modal-cup-section">
                <h3 className="cup-title">슈가펫 종이컵 가이드</h3>

                <div className="cup-visual-container">
                  {renderCupVisual(selectedProduct.todayGrams).cupsArr.map((fillPercent, idx) => (
                    <div key={idx} className="paper-cup-wrapper">
                      <div className="paper-cup-bg">
                        <div className="paper-cup-fill" style={{ height: `${fillPercent}%` }}></div>
                        <div className="cup-lines">
                          <span>3/4</span>
                          <span>1/2</span>
                          <span>1/4</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cup-desc-text">
                  {renderCupVisual(selectedProduct.todayGrams).desc}
                </div>
              </div>

            </div>

            <div className="modal-footer">
              <div className="modal-calc-box">
                <div className="calc-label">우리 아이 맞춤 급여량</div>
                <div className="calc-value">{selectedProduct.todayGrams}<span>g</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Information Edit Modal */}
      {editingProduct && isAdmin && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)} style={{ zIndex: 1000 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '32px 24px' }}>
            <button className="modal-close" onClick={() => setEditingProduct(null)}>
              <X size={24} />
            </button>
            <div className="modal-header" style={{ marginBottom: '16px' }}>
              <div className="modal-brand">관리자 데이터 수정</div>
              <h2 className="modal-product-name" style={{ fontSize: '1.25rem' }}>{editingProduct.name}</h2>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>제품 이미지 주소 (.jpg 또는 .png)</label>
              <input
                type="text"
                className="weight-input"
                value={editUrl}
                onChange={e => setEditUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                style={{ padding: '12px', fontSize: '0.9rem', width: '100%' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '8px' }}>외부 주소나 호스팅된 이미지 링크를 직접 붙여넣으세요.</p>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.85rem' }}>손님용 제품 특징 요약 (직접 입력)</label>
              <textarea
                className="weight-input"
                value={editKeyIngredients}
                onChange={e => setEditKeyIngredients(e.target.value)}
                placeholder="관절에 도움이 되는 글루코사민 함유 등..."
                style={{ padding: '12px', fontSize: '0.9rem', width: '100%', height: '100px', resize: 'none', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <button
                className="type-btn"
                onClick={() => setEditingProduct(null)}
                style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid var(--color-border)' }}
              >
                취소
              </button>
              <button
                className="calc-btn"
                onClick={handleSaveAdminEdit}
                style={{ flex: 1, padding: '14px', borderRadius: '12px' }}
              >
                <Save size={18} /> 저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
