import React, { useState } from 'react';

function Dashboard({ username, onLogout, onNewCreationClick }) {
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
        <div className="card new-card" onClick={onNewCreationClick}>
          <div className="new-card-content">
            <div className="plus-icon">+</div>
            <div className="new-card-text">새로 제작하기</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
