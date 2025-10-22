import React from 'react';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="brand">Amori</h1>
      </div>
      <nav className="header-nav">
        <button className="nav-link">제작하기</button>
        <button className="nav-link">제작내역</button>
        <button className="nav-link">스마트스토어</button>
      </nav>
      <div className="header-right">
        <div className="cart-section">
          <div className="cart-icon">
            <span className="cart-badge">0</span>
          </div>
          <span className="cart-text">Cart</span>
        </div>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={onLogout}>로그아웃</button>
        ) : (
          <button className="login-btn">로그인</button>
        )}
      </div>
    </header>
  );
}

export default Header;
