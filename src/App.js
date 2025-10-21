import React, { useState } from 'react';
import './App.css';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username] = useState('홍길동');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 로그인된 상태면 대시보드 표시
  if (isLoggedIn) {
    return <Dashboard username={username} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {/* Header */}
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
          <button className="login-btn">로그인</button>
        </div>
      </header>

      {/* Main Content */}
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
          <button className="yellow-button">노란색 버튼</button>
          <button className="green-button">초록색 버튼</button>
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Dashboard 컴포넌트
function Dashboard({ username, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('청첩장');
  const [showContextMenu, setShowContextMenu] = useState(null); // 어떤 카드의 메뉴가 열려있는지

  const categories = ['청첩장', '돌잔치', '감사장'];
  
  // 데모용 카드 데이터
  const cards = [
    { id: 1, title: '김철수 & 이영희 청첩장', createAt: '2024.01.15' },
    { id: 2, title: '박민수 & 정수진 청첩장', createAt: '2024.01.10' },
    { id: 3, title: '최동현 & 한미영 청첩장', createAt: '2024.01.08' },
    { id: 4, title: '이준호 & 김지은 청첩장', createAt: '2024.01.05' },
    { id: 5, title: '강태현 & 박소영 청첩장', createAt: '2024.01.03' },
  ];

  const handleContextMenu = (cardId, event) => {
    event.stopPropagation();
    setShowContextMenu(cardId);
  };

  const closeContextMenu = () => {
    setShowContextMenu(null);
  };

  // 메뉴 항목 클릭 핸들러
  const handleMenuAction = (action) => {
    console.log(`선택된 액션: ${action}`);
    closeContextMenu();
  };

  return (
    <div className="App">
      {/* Header */}
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
          <button className="logout-btn" onClick={onLogout}>로그아웃</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="welcome-section">
          <h2 className="welcome-text">{username}님, 반갑습니다.</h2>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="cards-grid" onClick={closeContextMenu}>
          {cards.map((card) => (
            <div key={card.id} className="card">
              <div className="card-content">
                <div className="card-title">{card.title}</div>
                <div className="card-date">{card.createAt}</div>
              </div>
              <button 
                className="card-menu-btn"
                onClick={(e) => handleContextMenu(card.id, e)}
              >
                ⋯
              </button>
              
              {showContextMenu === card.id && (
                <div className="context-menu">
                  <div className="menu-item" onClick={() => handleMenuAction('보기')}>보기</div>
                  <div className="menu-item" onClick={() => handleMenuAction('수정하기')}>수정하기</div>
                  <div className="menu-item" onClick={() => handleMenuAction('참석의사 응답보기')}>참석의사 응답보기</div>
                  <div className="menu-item" onClick={() => handleMenuAction('카카오톡 공유하기')}>카카오톡 공유하기</div>
                  <div className="menu-item" onClick={() => handleMenuAction('링크 복사하기')}>링크 복사하기</div>
                  <div className="menu-item" onClick={() => handleMenuAction('삭제하기')}>삭제하기</div>
                </div>
              )}
            </div>
          ))}
          
          {/* 새로 만들기 카드 */}
          <div className="card new-card">
            <div className="new-card-content">
              <div className="plus-icon">+</div>
              <div className="new-card-text">새로운 제작하기</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
