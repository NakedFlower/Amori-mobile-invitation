import React, { useState } from 'react';

// 5개의 화면(단계)을 각각의 컴포넌트로 분리합니다.
// CSS 슬라이드를 위해 모든 스텝을 항상 렌더링합니다.

// 단계 1: 환영
const Step1 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />결혼 축하드려요.</h2>
    <p className="wizard-subtitle">청첩장 메인 사진으로 사용할 거예요. <br />나중에 변경할 수 있어요.</p>
    <div className="wizard-image-placeholder large">
      {/* 데모용 이미지 */}
      <img 
        src="https://i.imgur.com/gS4kXcp.png" 
        alt="Wedding sample" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      청첩장 생성하러 가기
    </button>
  </div>
);

// 단계 2: 커버 사진
const Step2 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />청첩장 메인 커버사진을 골라주세요.</h2>
    <p className="wizard-subtitle">청첩장 커버사진으로 사용돼요. <br />나중에 변경할 수 있어요.</p>
    <div className="wizard-image-placeholder medium upload-box">
      <span>+</span>
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      다음
    </button>
  </div>
);

// 단계 3: 신랑/신부 성함
const Step3 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />신랑, 신부님 성함을 입력해주세요.</h2>
    <p className="wizard-subtitle">중복 입력 없이 쉽게 도와드릴게요. <br />나중에 변경할 수 있어요.</p>
    <div className="wizard-input-group">
      <label>신랑님 성함 (신랑이름)</label>
      <input type="text" />
      <label>신부님 성함 (신부이름)</label>
      <input type="text" />
      <label>(신부이름)</label>
      <input type="text" placeholder="예) 신부 아빠, 엄마 성함" />
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      다음
    </button>
  </div>
);

// 단계 4: 예식일/시간
const Step4 = ({ username, onNext }) => (
  <div className="wizard-step">
    {/* 이미지의 텍스트가 '결혼식 장점을 선택하셨어요'이지만, 입력은 날짜/시간이므로 이에 맞춥니다. */}
    <h2 className="wizard-title">{username}님, <br />결혼식 날짜와 시간을 입력해주세요.</h2>
    <p className="wizard-subtitle">예식일을 선택하세요. <br />나중에 변경할 수 있어요.</p>
    <div className="wizard-input-group">
      <label>예식일 (yyyy-mm-dd)</label>
      <input type="text" />
      <label>시간 (dd HH:mm)</label>
      <input type="text" />
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      다음
    </button>
  </div>
);

// 단계 5: 예식 장소
const Step5 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />예식 장소를 입력해주세요.</h2>
    <p className="wizard-subtitle">예식 장소를 선택해 주세요. <br />교통 정보를 반영할 수 있어요.</p>
    <div className="wizard-input-group">
      <button className="wizard-btn-secondary">주소 검색</button>
      <label>주소</label>
      <input type="text" value="경기도 성남시 분당구 판교로 228번길 16" readOnly />
      <label>예식장 이름</label>
      <input type="text" />
      <label>W스퀘어컨벤션</label>
      <input type="text" />
    </div>
    {/* 마지막 단계이므로 onNext 대신 다른 동작 (e.g., 저장)을 연결할 수 있습니다. */}
    <button className="wizard-btn-primary" onClick={onNext}>
      다음
    </button>
  </div>
);


// --- 메인 컴포넌트 ---
function InvitationEditor({ username, onBack }) {
  const [currentStep, setCurrentStep] = useState(0); // 0부터 4까지 (총 5단계)
  const totalSteps = 5;

  const handleNext = () => {
    // 마지막 단계가 아니면 다음 단계로
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계에서 '다음' 버튼 클릭 시 (e.g., 대시보드로 이동)
      console.log('초대장 생성 완료!');
      // 예시: onBack()을 호출하여 대시보드(혹은 템플릿 선택)로 돌아갑니다.
      onBack(); 
    }
  };

  const handlePrev = () => {
    // 첫 단계가 아니면 이전 단계로
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // 첫 단계에서 '뒤로'가기 시 (템플릿 선택 페이지로)
      onBack();
    }
  };

  // 프로그레스 바 계산
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <main className="wizard-container">
      {/* 프로그레스 바 및 네비게이션 */}
      <div className="wizard-navigation">
        <button onClick={handlePrev} className="wizard-nav-btn">〈</button>
        <div className="wizard-progress-bar">
          <div 
            className="wizard-progress-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <button onClick={handleNext} className="wizard-nav-btn">〉</button>
      </div>

      {/* 슬라이드 영역 (overflow: hidden 필요) */}
      <div className="wizard-slider-viewport">
        {/* 실제 슬라이드 되는 컨테이너 */}
        <div 
          className="wizard-slider-container"
          style={{ 
            width: `${totalSteps * 100}%`, // 5단계 * 100% = 500%
            transform: `translateX(-${(currentStep / totalSteps) * 100}%)` // 현재 단계에 맞게 이동
          }}
        >
          {/* 각 단계를 렌더링 */}
          <Step1 username={username} onNext={handleNext} />
          <Step2 username={username} onNext={handleNext} />
          <Step3 username={username} onNext={handleNext} />
          <Step4 username={username} onNext={handleNext} />
          <Step5 username={username} onNext={handleNext} />
        </div>
      </div>
    </main>
  );
}

export default InvitationEditor;