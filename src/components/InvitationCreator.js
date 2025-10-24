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
    '커버': [
      { name: '커버 타입', items: ['커버 타입 변경', '공지/제목 색상'] },
      { name: '본문', items: ['이미지', '기능'] }
    ],
    '본문': [
      { name: '공수', items: ['인사말', '혼주'] },
      { name: '이미지', items: ['이미지'] },
      { name: '기능', items: [] }
    ],
    '공유': [
      { name: '공수', items: [] },
      { name: '이미지', items: [] },
      { name: '혼주', items: [] }
    ]
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
              <div className="panel-header">
                <h3>확대 로고</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="checkbox-option">
                <input type="checkbox" id="use-logo" defaultChecked />
                <label htmlFor="use-logo">스크롤 속도 배경과 적용</label>
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
                  <div className="color-grid">
                    {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map(color => (
                      <div key={color} className="color-box" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '이미지':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>컬러 복사시 사용할 이미지</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="image-options">
                <div className="image-option-row">
                  <img src="https://i.imgur.com/gS4kXcp.png" alt="웨딩1" className="option-image" />
                  <div className="option-buttons">
                    <button className="btn-option">작게하기</button>
                    <button className="btn-option">삭제 되돌리기</button>
                  </div>
                </div>
                <div className="image-option-row">
                  <img src="https://via.placeholder.com/150x200/333/fff" alt="웨딩2" className="option-image" />
                  <div className="option-buttons">
                    <button className="btn-option">작게하기</button>
                    <button className="btn-option">삭제 되돌리기</button>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '기능':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>커버오늘 공유시 필채널지 기능 사용</h3>
                <button className="close-btn">×</button>
              </div>
              <p className="panel-description">
                커버오늘 복채널지에 대해 기능을 사용하는 공유
                커버오늘이 해석값 것보다 채광지 대륙다.<br/>
                수수량도 환특에 수~34지구 절로 소모됩니다.
              </p>
              <div className="checkbox-option">
                <input type="checkbox" id="use-share-feature" />
                <label htmlFor="use-share-feature">필채널지 기능 사용</label>
              </div>
            </div>
          );
        
        default:
          return <div className="edit-panel"><p>편집 패널</p></div>;
      }
    }
    
    if (activeTab === '본문') {
      switch (activeSidebarItem) {
        case '인사말':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>공수 환영</h3>
                <button className="close-btn">×</button>
              </div>
              <p className="panel-description">
                저희 두 사람이 사랑과 믿음으로 새 가정을 꾸리게 되었습니다.<br/>
                커버오늘이 해석값 것보다 채광지 대륙다.<br/>
                수수량도 환특에 수~34지구 절로 소모됩니다.
              </p>
              <div className="greeting-text-area">
                <label>인사말내다.</label>
                <textarea rows="6" placeholder="인사말을 입력하세요"></textarea>
              </div>
            </div>
          );
        
        case '혼주':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>혼주</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="contact-input-group">
                <div className="contact-row">
                  <label>신랑</label>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="전화번호" />
                </div>
                <div className="contact-row">
                  <label>아버지</label>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="전화번호" />
                </div>
                <div className="contact-row">
                  <label>어머니</label>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="전화번호" />
                </div>
                <div className="contact-row">
                  <label>신부</label>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="전화번호" />
                </div>
                <div className="contact-row">
                  <label>아버지</label>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="전화번호" />
                </div>
                <div className="contact-row">
                  <label>어머니</label>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="전화번호" />
                </div>
              </div>
            </div>
          );
        
        case '이미지':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>컬러 복사시 사용할 이미지</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="image-options">
                <div className="image-option-row">
                  <img src="https://i.imgur.com/gS4kXcp.png" alt="웨딩1" className="option-image" />
                  <div className="option-buttons">
                    <button className="btn-option">작게하기</button>
                    <button className="btn-option">삭제 되돌리기</button>
                  </div>
                </div>
                <div className="image-option-row">
                  <img src="https://via.placeholder.com/150x200/333/fff" alt="웨딩2" className="option-image" />
                  <div className="option-buttons">
                    <button className="btn-option">작게하기</button>
                    <button className="btn-option">삭제 되돌리기</button>
                  </div>
                </div>
              </div>
            </div>
          );
        
        default:
          return <div className="edit-panel"><p>편집 패널</p></div>;
      }
    }
    
    if (activeTab === '공유') {
      return (
        <div className="edit-panel">
          <div className="panel-header">
            <h3>공유 설정</h3>
            <button className="close-btn">×</button>
          </div>
          <p className="panel-description">
            청첩장을 공유하실 수 있습니다.
          </p>
          <div className="share-options">
            <button className="btn-share">카카오톡 공유</button>
            <button className="btn-share">링크 복사</button>
          </div>
        </div>
      );
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
          {sidebarItems[activeTab].map((section, sectionIdx) => (
            <div key={sectionIdx} className="sidebar-section">
              <div className="sidebar-section-header">{section.name}</div>
              {section.items.map(item => (
                <button
                  key={item}
                  className={`sidebar-item ${activeSidebarItem === item ? 'active' : ''}`}
                  onClick={() => setActiveSidebarItem(item)}
                >
                  {item}
                </button>
              ))}
            </div>
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
