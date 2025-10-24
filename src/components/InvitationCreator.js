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
      { name: '커버 타입', items: [] },
      { name: '글자/배경 색상', items: [] },
      { name: '커버 사진', items: [] },
      { name: '예식 정보', items: [] },
      { name: '배경 음악', items: [] },
      { name: '화면 효과', items: [] }
    ],
    '본문': [
      { name: '색상 관리', items: [] },
      { name: '본문 공유', items: [] },
      { name: '인사말', items: [] },
      { name: '사진첩', items: [] },
      { name: '예식 안내', items: [] },
      { name: '오시는 길', items: [] },
      { name: '마음 전하는 곳', items: [] },
      { name: '방명록', items: [] },
      { name: 'D-day', items: [] },
      { name: '참석의사', items: [] },
      { name: '포토부스', items: [] },
      { name: '피로에', items: [] },
      { name: '인사사항', items: [] },
      { name: '전화번호', items: [] },
      { name: '예권현금', items: [] },
      { name: '영상', items: [] }
    ],
    '공유': [
      { name: '문구', items: [] },
      { name: '이미지', items: [] },
      { name: '편집', items: [] }
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
        case '커버 타입':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>커버 타입 편집</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>커버 타입</h4>
                <div className="cover-type-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="cover-type-item">
                      <div className="cover-type-placeholder"></div>
                    </div>
                  ))}
                </div>
                <div className="animation-section">
                  <h4>애니메이션 설정</h4>
                  <div className="checkbox-option">
                    <input type="checkbox" id="use-animation" />
                    <label htmlFor="use-animation">애니메이션 설정</label>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '글자/배경 색상':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>커버 글자/배경 색상</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>커버 글자/배경 색상</h4>
                <div className="form-group">
                  <label>커버 텍스트</label>
                  <input 
                    type="text" 
                    value={invitationData.mainText} 
                    onChange={(e) => updateInvitationData('mainText', e.target.value)}
                    placeholder="Will you marry me?"
                  />
                </div>
                <div className="form-group">
                  <label>폰트</label>
                  <input type="text" placeholder="{font}" />
                </div>
                <div className="form-group">
                  <label>폰트 사이즈</label>
                  <div className="font-size-buttons">
                    <button className="btn-font-size">작게</button>
                    <button className="btn-font-size">보통</button>
                    <button className="btn-font-size">크게</button>
                  </div>
                </div>
                <div className="form-group">
                  <label>글자</label>
                  <div className="color-palette">
                    <div className="color-swatch" style={{backgroundColor: '#000000'}}></div>
                    <div className="color-grid">
                      {['#E8E8E8', '#FFCCCC', '#FF9999', '#FF6666', '#FF3333', '#FF0000',
                        '#E6FFE6', '#99FF99', '#66FF66', '#33FF33', '#00FF00', '#009900',
                        '#0066CC', '#003366'].map(color => (
                        <div key={color} className="color-box" style={{backgroundColor: color}}></div>
                      ))}
                    </div>
                    <div className="color-gradient"></div>
                    <input type="range" className="color-slider" />
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '커버 사진':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>커버 사진</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>커버 사진</h4>
                <div className="image-upload-section">
                  <div className="upload-placeholder">
                    <div className="upload-icon">📄</div>
                    <p>Click or drag image file</p>
                  </div>
                  <div className="image-preview">
                    <img src="https://i.imgur.com/gS4kXcp.png" alt="커버 사진" />
                  </div>
                  <div className="image-actions">
                    <button className="btn-action">삭제하기</button>
                    <button className="btn-action">변경하기</button>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '예식 정보':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>예식 정보</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>예식 정보</h4>
                <div className="form-group">
                  <label>예식장 이름</label>
                  <input type="text" placeholder="{placename}" />
                </div>
                <div className="form-group">
                  <label>시간</label>
                  <input type="text" placeholder="{dd HH:mm}" />
                </div>
                <div className="form-group">
                  <label>신랑님 성함</label>
                  <input type="text" placeholder="{신랑이름}" />
                </div>
                <div className="form-group">
                  <label>신부님 성함</label>
                  <input type="text" placeholder="{신부이름}" />
                </div>
                <div className="form-group">
                  <label>예식 날짜</label>
                  <input type="text" placeholder="{yyyy-MM-dd}" />
                </div>
              </div>
            </div>
          );
        
        case '배경 음악':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>배경 음악</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>배경 음악</h4>
                <div className="checkbox-option">
                  <input type="checkbox" id="use-bgm" defaultChecked />
                  <label htmlFor="use-bgm">배경 음악 사용하기</label>
                </div>
                <div className="bgm-selection">
                  <button className="btn-bgm">BGM</button>
                  <button className="btn-bgm">BGM</button>
                  <button className="btn-bgm">BGM</button>
                </div>
                <p className="bgm-notice">녹음시엔 미리듣기가 가능합니다.</p>
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
