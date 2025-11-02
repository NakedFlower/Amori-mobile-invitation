import React, { useState } from 'react';
import { login, getKakaoLoginUrl, getNaverLoginUrl } from '../services/api';

function MainPage({ onLogin, onSignupClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await login(email, password);
      alert(`환영합니다, ${response.user.name}님!`);
      setShowLoginForm(false);

      if (onLogin) {
        onLogin(response.user);
      }
    } catch (error) {
      alert(error.message);
      console.error('로그인 실패:', error);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const authUrl = await getKakaoLoginUrl();
      window.location.href = authUrl;
    } catch (error) {
      alert('카카오 로그인에 실패했습니다.');
      console.error('카카오 로그인 오류:', error);
    }
  };

  const handleNaverLogin = async () => {
    try {
      const authUrl = await getNaverLoginUrl();
      window.location.href = authUrl;
    } catch (error) {
      alert('네이버 로그인에 실패했습니다.');
      console.error('네이버 로그인 오류:', error);
    }
  };

  return (
    <main className="main-content">
      <div className="content-text">
        <h2 className="main-title">지금 바로 만들어보세요</h2>
        <p className="subtitle">
          <span className="highlight">{1234}</span>명이 먼저 만들었어요
        </p>
        <p className="rating-text">
          스마트스토어 평점 <span className="highlight">4.8</span>점, 리뷰 <span className="highlight">1,234</span>건
        </p>
      </div>

      <div className="button-section">
        <button className="yellow-button" onClick={handleKakaoLogin}>
          <img src="/kakao-logo-m.png" alt="N 로고" />
          카카오 로그인
        </button>
        <button className="green-button " onClick={handleNaverLogin}>
           <img src="/naver-logo-m.png" alt="N 로고" />
          네이버 로그인
        </button>
      </div>

      <div className="login-section">
        <button
          className="email-login-btn"
          onClick={() => setShowLoginForm(!showLoginForm)}
        >
          이메일로 로그인하기
        </button>

        {showLoginForm && (
          <div className="login-form">
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button className="purple-login-btn" onClick={handleLogin}>로그인</button>
            <div className="signup-footer">
              <span className="signup-link-text">계정이 없으신가요? </span>
              <button className="signup-link" onClick={onSignupClick}>
                회원가입하기
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainPage;