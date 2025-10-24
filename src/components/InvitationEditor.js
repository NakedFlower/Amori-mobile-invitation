import React, { useState } from 'react';

// 5개의 화면(단계)을 각각의 컴포넌트로 분리합니다.
// CSS 슬라이드를 위해 모든 스텝을 항상 렌더링합니다.

// =======================
// 결혼식 청첩장 단계들
// =======================

// 단계 1: 결혼식 청첩장 선택 (예식종류)
const Step1 = ({ username, onNext }) => {
  return (
    <div className="wizard-step">
      <h2 className="wizard-title">{username}님, <br />결혼식 청첩장을 선택하셨어요.</h2>
      <p className="wizard-subtitle">예식종류를 선택해주세요. <br />나중에 변경할 수 있어요.</p>
      <div className="wizard-input-group">
        <label>예식종류</label>
        <input type="text" placeholder="(yyyy-MM-dd)" />
        <label>시간</label>
        <input type="text" placeholder="(dd HH:mm)" />
      </div>
      <button className="wizard-btn-primary" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

// 단계 2: 예식 장소 입력
const Step2 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />예식 장소를 입력해주세요.</h2>
    <p className="wizard-subtitle">예식 장소를 등록해 주세요. <br />교통 정보를 반영할 수 있어요.</p>
    <div className="wizard-input-group">
      <button className="wizard-btn-secondary">주소 검색</button>
      <label>주소</label>
      <input type="text" placeholder="경기도 성남시 분당구 판교로 228번길 16" />
      <label>예식장 이름</label>
      <input type="text" placeholder="W스퀘어컨벤션" />
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
      <label>신랑님 성함</label>
      <input type="text" placeholder="(신랑이름)" />
      <label>신부님 성함</label>
      <input type="text" placeholder="(신부이름)" />
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      다음
    </button>
  </div>
);

// 단계 4: 청첩장 메인 커버사진
const Step4 = ({ username, onNext }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="wizard-step">
      <h2 className="wizard-title">{username}님, <br />청첩장 메인 커버사진을 골라주세요.</h2>
      <p className="wizard-subtitle">행복한 커버사진으로 사용돼요. <br />나중에 변경할 수 있어요.</p>
      <label htmlFor="cover-image-upload" className="wizard-image-placeholder large upload-box" style={{ cursor: 'pointer' }}>
        {uploadedImage ? (
          <img src={uploadedImage} alt="커버 사진" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '80px', color: '#ccc' }}>×</span>
        )}
      </label>
      <input
        id="cover-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <button className="wizard-btn-primary" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

// 단계 5: 결혼 축하 (메인 사진)
const Step5 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />결혼 축하드려요.</h2>
    <p className="wizard-subtitle">행복한 모습 사진으로 사용할게요. <br />나중에 변경할 수 있어요.</p>
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

// =======================
// 돌잔치 초대장 단계들
// =======================

// 돌잔치 단계 1: 돌잔치 선택 확인
const DolStep1 = ({ username, onNext }) => {
  return (
    <div className="wizard-step">
      <h2 className="wizard-title">{username}님, <br />돌잔치 초대장을 선택하셨어요.</h2>
      <p className="wizard-subtitle">돌잔치 정보를 입력해주세요. <br />나중에 변경할 수 있어요.</p>
      <div className="wizard-input-group">
        <label>행사 일정</label>
        <input type="text" placeholder="(yyyy-MM-dd)" />
        <label>시간</label>
        <input type="text" placeholder="(dd HH:mm)" />
      </div>
      <button className="wizard-btn-primary" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

// 돌잔치 단계 2: 행사 장소 입력
const DolStep2 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />행사 장소를 입력해주세요.</h2>
    <p className="wizard-subtitle">행사 장소를 등록해 주세요. <br />교통 정보를 반영할 수 있어요.</p>
    <div className="wizard-input-group">
      <button className="wizard-btn-secondary">주소 검색</button>
      <label>주소</label>
      <input type="text" placeholder="경기도 성남시 분당구 판교로 228번길 16" />
      <label>행사장 이름</label>
      <input type="text" placeholder="W스퀘어컨벤션" />
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      다음
    </button>
  </div>
);

// 돌잔치 단계 3: 아기 이름 입력
const DolStep3 = ({ username, onNext }) => {
  const [childCount, setChildCount] = useState(1);

  const addChild = () => {
    if (childCount < 3) {
      setChildCount(childCount + 1);
    }
  };

  const renderChildInputs = () => {
    const inputs = [];
    for (let i = 1; i <= childCount; i++) {
      inputs.push(
        <div key={i}>
          <label>아기 이름 {i}</label>
          <input type="text" placeholder={`(아기이름 ${i})`} />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className="wizard-step">
      <h2 className="wizard-title">{username}님, <br />아기 이름을 입력해주세요.</h2>
      <p className="wizard-subtitle">중복 입력 없이 쉬게 도와드릴게요. <br />나중에 변경할 수 있어요.</p>
      <div className="wizard-input-group">
        {renderChildInputs()}
        {childCount < 3 && (
          <button className="wizard-btn-secondary" onClick={addChild} style={{ marginTop: '10px' }}>
            + 아기 추가
          </button>
        )}
      </div>
      <button className="wizard-btn-primary" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

// 돌잔치 단계 4: 메인 커버 사진 업로드 (돌상)
const DolStep4 = ({ username, onNext }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="wizard-step">
      <h2 className="wizard-title">{username}님, <br />메인 커버 사진을 골라주세요.</h2>
      <p className="wizard-subtitle">행복한 커버사진으로 사용돼요. <br />나중에 변경할 수 있어요.</p>
      <label htmlFor="dol-cover-image-upload" className="wizard-image-placeholder large upload-box" style={{ cursor: 'pointer' }}>
        {uploadedImage ? (
          <img src={uploadedImage} alt="커버 사진" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '80px', color: '#ccc' }}>×</span>
        )}
      </label>
      <input
        id="dol-cover-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <button className="wizard-btn-primary" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

// 돌잔치 단계 5: 아기가 너무 예뻐요. 축하드려요. (메인 사진)
const DolStep5 = ({ username, onNext }) => (
  <div className="wizard-step">
    <h2 className="wizard-title">{username}님, <br />아기가 너무 예뻐요. 축하드려요.</h2>
    <p className="wizard-subtitle">행복한 모습 사진으로 사용할게요. <br />나중에 변경할 수 있어요.</p>
    <div className="wizard-image-placeholder large">
      {/* 돌잔치 데모 이미지 */}
      <img 
        src="https://i.imgur.com/sample-dol.png" 
        alt="Dol sample" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
    <button className="wizard-btn-primary" onClick={onNext}>
      초대장 생성하러 가기
    </button>
  </div>
);


// --- 메인 컴포넌트 ---
function InvitationEditor({ username, invitationType, onBack, onNext }) {
  const [currentStep, setCurrentStep] = useState(0); // 0부터 4까지 (총 5단계)
  const totalSteps = 5;
  
  // 초대장 타입에 따라 다른 단계 표시
  const isDol = invitationType === '돌잔치 초대장';

  const handleNext = () => {
    // 마지막 단계가 아니면 다음 단계로
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계에서 '다음' 버튼 클릭 시 (creator로 이동)
      console.log('초대장 생성 완료!');
      if (onNext) {
        onNext(); // creator로 이동
      } else {
        onBack(); 
      }
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
            transform: `translateX(-${currentStep * 20}%)`
          }}
        >
          {/* 각 단계를 렌더링 */}
          {isDol ? (
            // 돌잔치 초대장 플로우
            <>
              <DolStep1 username={username} onNext={handleNext} />
              <DolStep2 username={username} onNext={handleNext} />
              <DolStep3 username={username} onNext={handleNext} />
              <DolStep4 username={username} onNext={handleNext} />
              <DolStep5 username={username} onNext={handleNext} />
            </>
          ) : (
            // 결혼식 청첩장 플로우
            <>
              <Step1 username={username} onNext={handleNext} />
              <Step2 username={username} onNext={handleNext} />
              <Step3 username={username} onNext={handleNext} />
              <Step4 username={username} onNext={handleNext} />
              <Step5 username={username} onNext={handleNext} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default InvitationEditor;