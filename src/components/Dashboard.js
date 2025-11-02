import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/api';

// JWT 토큰에서 사용자 정보 가져오기
function getUserInfo() {
  const normalToken = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const socialToken = localStorage.getItem('access_token');

  if (normalToken && userStr) {
    try {
      const user = JSON.parse(userStr);
      return {
        name: user.name || '사용자',
        token: normalToken,
        type: 'normal'
      };
    } catch (e) {
      console.error('사용자 정보 파싱 실패', e);
    }
  }

  if (socialToken) {
    try {
      const payload = JSON.parse(atob(socialToken.split('.')[1]));
      return {
        name: payload.name || '사용자',
        token: socialToken,
        type: 'social'
      };
    } catch (e) {
      console.error('JWT 디코딩 실패', e);
    }
  }

  return null;
}

function Dashboard({ onLogout, onNewCreationClick }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('청첩장');
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // OAuth 콜백 처리 (소셜 로그인)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      // 소셜 로그인 토큰으로 사용자 정보 조회
      fetchUserInfo(token);
      
      // URL에서 토큰 제거 (보안)
      window.history.replaceState({}, '', '/dashboard');
      console.log('소셜 로그인 성공');
    } else if (error) {
      console.error('OAuth 에러:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/login');
    } else {
      // 일반 로그인 또는 이미 로그인된 상태
      const userInfo = getUserInfo();
      if (userInfo) {
        setUsername(userInfo.name);
      } else {
        // 로그인 정보 없음 - 로그인 페이지로 이동
        navigate('/login');
      }
    }

    setIsLoading(false);
  }, [navigate]);

  // 소셜 로그인 후 사용자 정보 가져오기
  const fetchUserInfo = async (token) => {
    try {
      const userData = await getCurrentUser(token);
      setUsername(userData.name || '사용자');
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      setUsername('사용자');
    }
  };

  const categories = ['청첩장', '돌잔치', '감사장'];
  
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

  const handleMenuAction = (action) => {
    console.log(`선택된 액션: ${action}`);
    closeContextMenu();
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <main className="dashboard-content">
      <div className="welcome-section">
        <h2 className="welcome-text">{username}님, 반갑습니다.</h2>
      </div>

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