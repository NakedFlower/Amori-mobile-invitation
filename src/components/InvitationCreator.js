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
    useLocationFeature: false,
    
    // 섹션 관리
    sections: [
      { id: 1, name: '본문 공통', color: '#D5A9B5', enabled: true },
      { id: 2, name: '인사말', color: '#D5A9B5', enabled: true },
      { id: 3, name: '사진첩', color: '#D5A9B5', enabled: true },
      { id: 4, name: '예식 안내', color: '#D5A9B5', enabled: true },
      { id: 5, name: '오시는 길', color: '#D5A9B5', enabled: true },
      { id: 6, name: '마음 전하는 곳', color: '#D5A9B5', enabled: true },
      { id: 7, name: '방명록', color: '#D5A9B5', enabled: true },
      { id: 8, name: 'D-day', color: '#D5A9B5', enabled: true },
      { id: 9, name: '참석의사', color: '#D5A9B5', enabled: true },
      { id: 10, name: '포토부스', color: '#D5A9B5', enabled: false },
      { id: 11, name: '피로에', color: '#D5A9B5', enabled: false },
      { id: 12, name: '전화번호', color: '#D5A9B5', enabled: false },
      { id: 13, name: '인사사항', color: '#D5A9B5', enabled: true },
      { id: 14, name: '영상', color: '#D5A9B5', enabled: true },
      { id: 15, name: '애견화동', color: '#D5A9B5', enabled: true }
    ],
    
    // 본문 공통
    commonTextColor: '#D5A9B5',
    commonFont: 'font',
    
    // 인사말
    greetingTitle: '초대합니다',
    greetingText: '',
    greetingImages: [],
    groomTitle: '신랑 혼자',
    groomName2: '아버지',
    groomName3: '어머니',
    brideTitle: '신부 혼자',
    brideName2: '아버지',
    brideName3: '어머니',
    greetingRelation: '아들',
    
    // 사진첩
    photoAlbum: [
      { id: 1, type: '사진 추가' },
      { id: 2, type: '사진 추가' },
      { id: 3, type: '사진 추가' },
      { id: 4, type: '사진 추가' },
      { id: 5, type: '사진 추가' }
    ],
    
    // 예식 안내
    ceremonyTitle: '예식 안내',
    ceremonyVenue: 'W스퀘어컨벤션',
    ceremonyFloor: '예식 안내 본구',
    
    // 오시는 길
    locationTitle: '오시는 길',
    locationAddress: '경기도 성남시 분당구 삼평로 198',
    locationMap: '',
    transportInfo: '',
    
    // 마음 전하실 곳
    accountTitle: '마음을 전해주세요. 예시',
    useGift: false,
    groomAccount: '',
    brideAccount: '',
    
    // 방명록
    guestbookTitle: '축하글을 남겨주세요.',
    
    // D-day
    ddayTitle: '',
    groomNames: '김동',
    brideNames: '승향',
    
    // 참석의사
    attendanceTitle: '참석 의사',
    attendanceDesc: '축하의 마음으로 참석해 주시는 \n모든 분들께 귀하게 보신 것 없도록 \n참석 의사를 전해 부탁드립니다.',
    useCoverAttend: true,
    useTextAttend: true,
    useAttendCount: true,
    
    // 포토부스
    photoboothTitle: '포토부스 남겨주세요',
    photoboothPhoto: '',
    photoboothDesc: '함께하는 모든 순간이 \n특별한 추억으로드, \n포토부스에서 즐거운 사진을 찍어 후세요. \n\n예식일 본문 참세문에 위치해있습니다.',
    
    // 피로연
    receptionTitle: '2부인내',
    receptionPhoto: '',
    receptionDesc: '처음 두 사람이 결혼을 축복하주려 \n오신 모든 본들께 선환으로 감사드립니다. \n준비한 피로연에서 뷇아 한 어이가 나누며 \n즐거운 시간 보내시길 바랍니다.',
    
    // 인사사항
    noticeTitle: '인내 사항',
    noticeDesc: '주차정은 건물 지하 1, 2층으로 이루어져있으며, \n80대 정도의 주차공간이 구비됩니다. \n외부에 주차장이 있으니 참고해주십시오.',
    
    // 전세버스
    busTitle: '전화 버스 연락처',
    busDesc: '호키사간: 예식 당일 07:00, 09:00, 10:00 \n\n한순우스: 컴실북, 서울역, 영등포역 \n인순을 연락처: 010-xxxx-xxxx \n버스폰 연락처: 010-xxxx-xxxx',
    
    // 애견화동
    petTitle: '예권 현생',
    petPhoto: '',
    petDesc: '사랑스러운 손이의 학동이 결역을 축복합니다. \n볈지도, 니지도 않게 \n\n서로의 후는에 스마트엀고 \n아름, 하나의 이름이 됩니다.',
    
    // 영상
    videoTitle: '초대합니다',
    videoPhoto: '',
    videoDesc: '가족쿨을 건얰하여 \n볈지도, 니지도 않게 \n\n서로의 후에에 스마트엀고 \n아름, 하나의 이름이 됩니다.',
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
      { name: '섹션 관리', items: [] },
      { name: '본문 공통', items: [] },
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
      { name: '전세버스', items: [] },
      { name: '애건화동', items: [] },
      { name: '영상', items: [] }
    ],
    '공유': [
      { name: '문구', items: [] },
      { name: '이미지', items: [] },
      { name: '기능', items: [] }
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
                  <label>예식 날짜</label>
                  <input type="text" placeholder="{yyyy-MM-dd}" />
                </div>
                <div className="form-group">
                  <label>시간</label>
                  <input type="text" placeholder="{dd HH:mm}" />
                </div>
                <div className="form-group">
                  <label>예식장 이름</label>
                  <input type="text" placeholder="{placename}" />
                </div>
                <div className="form-group">
                  <label>신랑님 성함</label>
                  <input type="text" placeholder="{신랑이름}" />
                </div>
                <div className="form-group">
                  <label>신부님 성함</label>
                  <input type="text" placeholder="{신부이름}" />
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
        case '섹션 관리':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>섹션 관리</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>섹션 순서 변경</h4>
                <p className="panel-description">
                  사용할 섹션의 순서와 활성화 여부를 선택해 프레임에 적용해보세요. 
                </p>
                <div className="section-management-list">
                  {invitationData.sections.map(section => (
                    <div key={section.id} className="section-item">
                      <div className="drag-handle">☰</div>
                      <div className="section-name">{section.name}</div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={section.enabled}
                          onChange={() => {
                            const updatedSections = invitationData.sections.map(s => 
                              s.id === section.id ? {...s, enabled: !s.enabled} : s
                            );
                            updateInvitationData('sections', updatedSections);
                          }}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        
        case '본문 공통':
          return (
            <div className="edit-panel">
              <div className="panel-header">  
                <h3>본문 공통</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>색상 편집</h4>
                <div className="form-group">
                  <label>제목 순 고객</label>
                  <div className="color-input-row">
                    <div 
                      className="color-preview-box" 
                      style={{backgroundColor: invitationData.commonTextColor}}
                    ></div>
                    <input 
                      type="text" 
                      value={invitationData.commonTextColor}
                      onChange={(e) => updateInvitationData('commonTextColor', e.target.value)}
                    />
                  </div>
                  <div className="color-picker-section">
                    <div className="color-type-tabs">
                      <button className="color-tab">글자색</button>
                      <button className="color-tab">배경색</button>
                    </div>
                    <div className="color-gradient"></div>
                    <input type="range" className="color-slider" />
                  </div>
                </div>
                
                <h4>본문 폰트</h4>
                <div className="form-group">
                  <label>예를 50 고객</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                <div className="form-group">
                  <label>나늘 맹조</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                <div className="form-group">
                  <label>여를 호수</label>
                  <div className="font-input-row">
                    <input type="text" placeholder="여를 높이" />
                  </div>
                </div>
                <div className="form-group">
                  <label>고용 순출</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                <div className="form-group">
                  <label>고용 버넓</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                
                <h4>본문 폰트</h4>
                <div className="form-group">
                  <label>예를 50 고객</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                <div className="form-group">
                  <label>나늘 맹조</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                <div className="form-group">
                  <label>고용 순출</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                <div className="form-group">
                  <label>고용 버넓</label>
                  <input type="text" placeholder="우리, 결혼합니다" readOnly />
                </div>
                
                <div className="form-group">
                  <label>크기 크기</label>
                  <div className="size-buttons">
                    <button className="btn-size">작게</button>
                    <button className="btn-size">보통</button>
                    <button className="btn-size">크게</button>
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '인사말':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>인사말 편집</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>문구</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.greetingTitle}
                    onChange={(e) => updateInvitationData('greetingTitle', e.target.value)}
                    placeholder="초대합니다"
                  />
                </div>
                
                <h4>사진</h4>
                <div className="form-group">
                  <button className="btn-add-photo">사진 추가</button>
                </div>
                
                <h4>인사말 문구</h4>
                <div className="greeting-names-section">
                  <div className="name-group">
                    <label>신랑 아버님 성함</label>
                    <div className="name-inputs">
                      <input type="text" value={invitationData.groomTitle} readOnly />
                      <button className="btn-icon">📝</button>
                    </div>
                  </div>
                  <div className="name-group">
                    <label>신랑 어머님 성함</label>
                    <div className="name-inputs">
                      <input type="text" value={invitationData.groomName2} />
                      <button className="btn-icon">📝</button>
                    </div>
                  </div>
                  <div className="name-group">
                    <label>신부 아버님 성함</label>
                    <div className="name-inputs">
                      <input type="text" value={invitationData.groomName3} />
                      <button className="btn-icon">📝</button>
                    </div>
                  </div>
                  
                  <div className="name-group">
                    <label>신부 어머님 성함</label>
                    <div className="name-inputs">
                      <input type="text" value={invitationData.brideTitle} readOnly />
                      <button className="btn-icon">📝</button>
                    </div>
                  </div>
                  
                  <div className="name-group">
                    <label>신랑 호칭</label>
                    <input type="text" value="아들" readOnly />
                  </div>
                  <div className="name-group">
                    <label>신랑 이름</label>
                    <input type="text" value="홍길동" />
                  </div>
                  <div className="name-group">
                    <label>신랑 호칭</label>
                    <input type="text" value="딸" readOnly />
                  </div>
                  <div className="name-group">
                    <label>신부 이름</label>
                    <input type="text" value="성준향" />
                  </div>
                </div>
              </div>
            </div>
          );
        
        case '사진첩':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>사진첩 편집</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input type="text" value="사진첩" readOnly />
                </div>
                
                <h4>사진 보기 방식</h4>
                <div className="photo-ratio-buttons">
                  <button className="btn-ratio">1:1</button>
                  <button className="btn-ratio">3:4</button>
                </div>
                <div className="photo-ratio-buttons">
                  <button className="btn-ratio">확대 방지 적용</button>
                  <button className="btn-ratio">확대 방지</button>
                </div>
                
                <h4>사진 추가</h4>
                <div className="photo-grid">
                  {invitationData.photoAlbum.map(photo => (
                    <div key={photo.id} className="photo-item">
                      <div className="photo-placeholder">
                        <div className="drag-handle">☰</div>
                        <button className="btn-delete">👁</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        
        case '예식 안내':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>예식 안내 편집</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.ceremonyTitle}
                    onChange={(e) => updateInvitationData('ceremonyTitle', e.target.value)}
                  />
                </div>
                
                <h4>예식장 이름</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.ceremonyVenue}
                    onChange={(e) => updateInvitationData('ceremonyVenue', e.target.value)}
                    placeholder="W스퀘어컨벤션"
                  />
                </div>
                
                <h4>안내 문구</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.ceremonyFloor}
                    onChange={(e) => updateInvitationData('ceremonyFloor', e.target.value)}
                    placeholder="예식 안내 문구"
                  />
                </div>
              </div>
            </div>
          );
        
        case '오시는 길':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>오시는 길</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.locationTitle}
                    onChange={(e) => updateInvitationData('locationTitle', e.target.value)}
                  />
                </div>
                
                <h4>주소 검색</h4>
                <div className="form-group">
                  <button className="btn-search">주소 검색</button>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.locationAddress}
                    onChange={(e) => updateInvitationData('locationAddress', e.target.value)}
                  />
                </div>
                
                <h4>지도</h4>
                <div className="map-preview">
                  <div className="map-placeholder">지도 영역</div>
                </div>
                
                <h4>교통수단 추가</h4>
                <div className="form-group">
                  <button className="btn-transport">추가</button>
                </div>
                
                <h4>교통수단</h4>
                <div className="form-group">
                  <input type="text" placeholder="차량/도보 이동 시" />
                </div>
                
                <h4>이용방법</h4>
                <div className="form-group">
                  <div className="text-editor-toolbar">
                    <button className="btn-format">B</button>
                    <button className="btn-format">I</button>
                    <button className="btn-format">U</button>
                    <button className="btn-format">S</button>
                    <button className="btn-format">≡</button>
                    <button className="btn-format">≡</button>
                    <button className="btn-format">🎨</button>
                    <button className="btn-format">×</button>
                  </div>
                  <textarea 
                    rows="4" 
                    placeholder="삼성역 오른쪽에 위치"
                  ></textarea>
                </div>
              </div>
            </div>
          );
        
        case '마음 전하는 곳':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>마음 전하실 곳</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.accountTitle}
                    onChange={(e) => updateInvitationData('accountTitle', e.target.value)}
                  />
                </div>
                
                <h4>문구 추가</h4>
                <div className="form-group">
                  <input type="text" placeholder="마음을 전해주세요. 예시" />
                </div>
                
                <h4>계좌번호 접어 두기</h4>
                <div className="checkbox-option">
                  <input 
                    type="checkbox" 
                    id="use-gift" 
                    checked={invitationData.useGift}
                    onChange={(e) => updateInvitationData('useGift', e.target.checked)}
                  />
                  <label htmlFor="use-gift">접어 두기</label>
                </div>
                
                <h4>계좌번호 추가</h4>
                <div className="account-buttons">
                  <button className="btn-account">신랑 측 추가</button>
                  <button className="btn-account">신부 측 추가</button>
                </div>
              </div>
            </div>
          );
        
        case '방명록':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>방명록</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.guestbookTitle}
                    onChange={(e) => updateInvitationData('guestbookTitle', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case 'D-day':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>D-day</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.ddayTitle}
                    onChange={(e) => updateInvitationData('ddayTitle', e.target.value)}
                    placeholder="제목"
                  />
                </div>
                
                <h4>신랑 성함</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.groomNames}
                    onChange={(e) => updateInvitationData('groomNames', e.target.value)}
                  />
                </div>
                
                <h4>신부 성함</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.brideNames}
                    onChange={(e) => updateInvitationData('brideNames', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case '참석의사':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>참석 의사</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.attendanceTitle}
                    onChange={(e) => updateInvitationData('attendanceTitle', e.target.value)}
                  />
                </div>
                
                <h4>문구</h4>
                <div className="form-group">
                  <textarea 
                    rows="4"
                    value={invitationData.attendanceDesc}
                    onChange={(e) => updateInvitationData('attendanceDesc', e.target.value)}
                  />
                </div>
                
                <h4>자동 팝업 사용</h4>
                <div className="checkbox-option">
                  <input type="checkbox" id="cover-attend" defaultChecked />
                  <label htmlFor="cover-attend">커버 팝업</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" id="text-attend" defaultChecked />
                  <label htmlFor="text-attend">본문 팝업</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" id="attend-count" defaultChecked />
                  <label htmlFor="attend-count">사용하지 않음</label>
                </div>
              </div>
            </div>
          );
        
        case '포토부스':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>포토부스</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.photoboothTitle}
                    onChange={(e) => updateInvitationData('photoboothTitle', e.target.value)}
                  />
                </div>
                
                <h4>사진 보기 방식</h4>
                <div className="form-group">
                  <button className="btn-add-photo">사진 추가</button>
                </div>
                <div className="photo-preview">
                  <img src="https://via.placeholder.com/150" alt="포토부스" />
                  <div className="photo-actions">
                    <button className="btn-action">삭제하기</button>
                    <button className="btn-action">변경하기</button>
                  </div>
                </div>
                
                <h4>문구</h4>
                <div className="form-group">
                  <textarea 
                    rows="4"
                    value={invitationData.photoboothDesc}
                    onChange={(e) => updateInvitationData('photoboothDesc', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case '피로연':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>피로연</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.receptionTitle}
                    onChange={(e) => updateInvitationData('receptionTitle', e.target.value)}
                  />
                </div>
                
                <h4>사진 추가</h4>
                <div className="form-group">
                  <button className="btn-add-photo">사진 추가</button>
                </div>
                <div className="photo-preview">
                  <img src="https://via.placeholder.com/150" alt="피로연" />
                  <div className="photo-actions">
                    <button className="btn-action">삭제하기</button>
                    <button className="btn-action">변경하기</button>
                  </div>
                </div>
                
                <h4>문구 추가</h4>
                <div className="form-group">
                  <textarea 
                    rows="6"
                    value={invitationData.receptionDesc}
                    onChange={(e) => updateInvitationData('receptionDesc', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case '안내사항':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>안내 사항</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.noticeTitle}
                    onChange={(e) => updateInvitationData('noticeTitle', e.target.value)}
                  />
                </div>
                
                <h4>문구 추가</h4>
                <div className="form-group">
                  <textarea 
                    rows="5"
                    value={invitationData.noticeDesc}
                    onChange={(e) => updateInvitationData('noticeDesc', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case '전세버스':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>전세버스</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.busTitle}
                    onChange={(e) => updateInvitationData('busTitle', e.target.value)}
                  />
                </div>
                
                <h4>문구 추가</h4>
                <div className="form-group">
                  <textarea 
                    rows="6"
                    value={invitationData.busDesc}
                    onChange={(e) => updateInvitationData('busDesc', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case '애견화동':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>애견 화동</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.petTitle}
                    onChange={(e) => updateInvitationData('petTitle', e.target.value)}
                  />
                </div>
                
                <h4>사진 추가</h4>
                <div className="form-group">
                  <button className="btn-add-photo">사진 추가</button>
                </div>
                <div className="photo-preview">
                  <img src="https://via.placeholder.com/150" alt="애견화동" />
                  <div className="photo-actions">
                    <button className="btn-action">삭제하기</button>
                    <button className="btn-action">변경하기</button>
                  </div>
                </div>
                
                <h4>문구 추가</h4>
                <div className="form-group">
                  <textarea 
                    rows="6"
                    value={invitationData.petDesc}
                    onChange={(e) => updateInvitationData('petDesc', e.target.value)}
                  />
                </div>
              </div>
            </div>
          );
        
        case '영상':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>영상</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>제목</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    value={invitationData.videoTitle}
                    onChange={(e) => updateInvitationData('videoTitle', e.target.value)}
                  />
                </div>
                
                <h4>동영상 추가</h4>
                <div className="form-group">
                  <button className="btn-add-photo">동영상 추가</button>
                </div>
                <div className="photo-preview">
                  <img src="https://via.placeholder.com/150" alt="영상" />
                  <div className="photo-actions">
                    <button className="btn-action">삭제하기</button>
                    <button className="btn-action">변경하기</button>
                  </div>
                </div>
                
                <h4>문구 추가</h4>
                <div className="form-group">
                  <textarea 
                    rows="6"
                    value={invitationData.videoDesc}
                    onChange={(e) => updateInvitationData('videoDesc', e.target.value)}
                  />
                </div>
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
      switch (activeSidebarItem) {
        case '기능':
          return (
            <div className="edit-panel">
              <div className="panel-header">
                <h3>기능</h3>
                <button className="close-btn">×</button>
              </div>
              <div className="panel-content">
                <h4>문구</h4>
                <div className="form-group">
                  <label>카카오톡 공유시 위치보기 기능 사용</label>
                  <p className="feature-description">
                    카카오톡 채팅방에서 예에 기능을 사용하실 경우 <br/>
                    카카오예서 캐시를 자장하기 대문에 <br/>
                    승잘시속 반영면 2~3시간 정도 소요됩니다.
                  </p>
                </div>
                
                <div className="checkbox-option">
                  <input 
                    type="checkbox" 
                    id="use-location" 
                    checked={invitationData.useLocationFeature}
                    onChange={(e) => updateInvitationData('useLocationFeature', e.target.checked)}
                  />
                  <label htmlFor="use-location">위치보기 기능 사용</label>
                </div>
              </div>
            </div>
          );
        
        default:
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
              <div 
                className={`sidebar-section-header ${activeSidebarItem === section.name ? 'active' : ''}`}
                onClick={() => setActiveSidebarItem(section.name)}
              >
                {section.name}
              </div>
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
          <button className="btn-save">임시저장</button>
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
