import React, { useState } from 'react';

function InvitationCreator({ username, onBack }) {
  const [activeTab, setActiveTab] = useState('커버');
  const [activeSidebarItem, setActiveSidebarItem] = useState('커버 타입 변경');
  
  // 청첩장 데이터 상태
  const [invitationData, setInvitationData] = useState({
    // 커버
    coverImage: 'https://i.imgur.com/gS4kXcp.png',
    mainText: 'Will you marry me?',
    venue: 'W스퀘어컨벤션',
    date: '2025년1월1일 AM 11:00',
    
    // 본문
    groomName: '[신랑이름]',
    brideName: '[신부이름]',
    groomFatherName: '[아버지]',
    groomMotherName: '[어머니]',
    brideFatherName: '[아버지]',
    brideMotherName: '[어머니]',
    groomContact: '[dd ttt-tttt]',
    brideContact: '[dd ttt-tttt]',
    messageContent: '',
    
    // 공유
    shareMessage: '',
  });

  const tabs = ['커버', '본문', '공유'];
  
  const sidebarItems = {
    '커버': ['커버 타입 변경', '공지/제목 색상', '커버 사진', '예식 일정', '예식 장소', '연락 조회'],
    '본문': ['커버 타입', '공지/제목 색상', '커버 사진', '예식 일정', '예식 장소', '배경 음악'],
    '공유': ['배경 음악']
  };

  const updateInvitationData = (key, value) => {
    setInvitationData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderEditPanel = () => {
    if (activeTab === '커버') {
      switch (activeSidebarItem) {
        case '커버 타입 변경':
          return (
            <div className="edit-panel">
              <h3>커버 타입 변경</h3>
              <div className="cover-type-grid">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div key={num} className="cover-type-option">
                    <div className="cover-type-placeholder">커버 {num}</div>
                  </div>
                ))}
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="animation" />
                <label htmlFor="animation">애니메이션 설정</label>
              </div>
            </div>
          );
        
        case '공지/제목 색상':
          return (
            <div className="edit-panel">
              <h3>공지/제목 색상 선택</h3>
              <div className="color-input-group">
                <label>메인 텍스트</label>
                <input type="text" value={invitationData.mainText} onChange={(e) => updateInvitationData('mainText', e.target.value)} />
                <label>색상</label>
                <div className="color-selector">
                  <button>연자</button>
                  <button>보통</button>
                  <button>진함</button>
                </div>
                <div className="color-palette">
                  {/* 색상 팔레트 */}
                  <div className="color-grid">
                    {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map(color => (
                      <div key={color} className="color-box" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '커버 사진':
          return (
            <div className="edit-panel">
              <h3>커버 사진</h3>
              <div className="image-upload-section">
                <div className="image-preview-box">
                  <img src={invitationData.coverImage} alt="커버" />
                </div>
                <div className="image-buttons">
                  <button className="btn-secondary">대표이미지</button>
                  <button className="btn-secondary">본문이미지</button>
                </div>
              </div>
            </div>
          );
        
        case '예식 일정':
          return (
            <div className="edit-panel">
              <h3>예식 일정</h3>
              <div className="input-group">
                <label>예식 일정</label>
                <input type="text" placeholder="[placeholder]" />
                <label>양력</label>
                <input type="text" placeholder="[dd ttt-tttt]" />
                <label>음력 일정</label>
                <input type="text" placeholder="[dd월dd일]" />
                <label>예식 시간</label>
                <input type="text" placeholder="[yyyy-MM-dd]" />
              </div>
            </div>
          );
        
        case '예식 장소':
          return (
            <div className="edit-panel">
              <h3>예식 장소</h3>
              <div className="checkbox-option">
                <input type="checkbox" id="show-traffic" defaultChecked />
                <label htmlFor="show-traffic">버튼 표시 여부하기</label>
              </div>
              <div className="traffic-buttons">
                <button className="btn-traffic">BGM</button>
                <button className="btn-traffic">BGM</button>
                <button className="btn-traffic">BGM</button>
              </div>
            </div>
          );
        
        default:
          return <div className="edit-panel"><p>편집 패널</p></div>;
      }
    }
    
    return <div className="edit-panel"><p>{activeTab} - {activeSidebarItem}</p></div>;
  };

  return (
    <div className="invitation-creator">
      {/* 왼쪽 사이드바 */}
      <div className="creator-sidebar">
        <div className="sidebar-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`sidebar-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setActiveSidebarItem(sidebarItems[tab][0]);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="sidebar-items">
          {sidebarItems[activeTab].map(item => (
            <button
              key={item}
              className={`sidebar-item ${activeSidebarItem === item ? 'active' : ''}`}
              onClick={() => setActiveSidebarItem(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 가운데 편집 영역 */}
      <div className="creator-edit-area">
        {renderEditPanel()}
      </div>

      {/* 오른쪽 미리보기 */}
      <div className="creator-preview">
        <div className="preview-header">
          <button className="btn-close" onClick={onBack}>×</button>
        </div>
        <div className="preview-phone">
          <div className="preview-content">
            <div className="preview-cover">
              <img src={invitationData.coverImage} alt="미리보기" />
              <div className="preview-text">
                <h2>{invitationData.mainText}</h2>
                <div className="preview-info">
                  <p>{invitationData.venue}</p>
                  <p>{invitationData.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationCreator;
