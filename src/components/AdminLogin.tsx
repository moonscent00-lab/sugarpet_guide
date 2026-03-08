import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import ProcessedLogo from './ProcessedLogo';

interface AdminLoginProps {
    onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'sugarpet') {
            setError(false);
            onLogin();
        } else {
            setError(true);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <ProcessedLogo className="app-main-logo" style={{ margin: '0 auto 24px', display: 'block' }} />
                <h2 className="admin-login-title">슈가펫 관리자 로그인</h2>
                <p className="admin-login-subtitle">상품 정보 및 이미지를 수정하려면 권한이 필요합니다.</p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="admin-input-wrapper">
                        <Lock size={18} className="admin-input-icon" />
                        <input
                            type="password"
                            placeholder="비밀번호 입력 (sugarpet)"
                            className="admin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>
                    {error && <div className="admin-error">비밀번호가 일치하지 않습니다.</div>}
                    <button type="submit" className="admin-login-btn">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}
