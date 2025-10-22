import React, { useState } from 'react';

function MainPage({ onLogin, onSignupClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = () => {
    onLogin();
    setShowLoginForm(false);
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
        <button className="yellow-button">카카오톡 로그인</button>
        <button className="green-button">네이버 로그인</button>
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
            />
            <input 
              type="password" 
              placeholder="비밀번호를 입력해주세요" 
              className="login-input"
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
