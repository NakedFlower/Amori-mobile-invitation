import React from 'react';

function Header({ isLoggedIn, onLogout, onNavigate }) {
  const handleBrandClick = () => {
    if (isLoggedIn && onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handleCreateClick = () => {
    if (isLoggedIn && onNavigate) {
      onNavigate('template');
    }
  };

  const handleHistoryClick = () => {
    if (isLoggedIn && onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 
          className="brand" 
          onClick={handleBrandClick}
          style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}
        >
          Amori
        </h1>
      </div>
      <nav className="header-nav">
        <button className="nav-link" onClick={handleCreateClick}>제작하기</button>
        <button className="nav-link" onClick={handleHistoryClick}>제작내역</button>
        <button className="nav-link">스마트스토어</button>
      </nav>
      <div className="header-right">
        {isLoggedIn && (
          <>
            <div className="cart-section">
              <div className="cart-icon">
                <span className="cart-badge">0</span>
              </div>
              <span className="cart-text">Cart</span>
            </div>
            <button className="logout-btn" onClick={onLogout}>로그아웃</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
