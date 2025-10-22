import React, { useState } from 'react';

function SignupPage({ onBack, onSignup }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = () => {
    // 여기에 회원가입 로직 추가
    console.log('회원가입 데이터:', formData, profileImage);
    if (onSignup) {
      onSignup(formData);
    }
  };

  return (
    <main className="main-content">
      <div className="content-text">
        <h2 className="main-title">회원가입</h2>
        <p className="subtitle">Amori와 함께 시작하세요</p>
      </div>
      
      <div className="signup-form">
        {/* 프로필 이미지 */}
        <div className="profile-image-section">
          <div className="profile-image-preview">
            {previewUrl ? (
              <img src={previewUrl} alt="프로필 미리보기" />
            ) : (
              <div className="profile-placeholder">+</div>
            )}
          </div>
          <label htmlFor="profile-upload" className="profile-upload-label">
            프로필 이미지 업로드
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* 입력 필드들 */}
        <input 
          type="text"
          name="name"
          placeholder="이름" 
          className="login-input"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input 
          type="email"
          name="email"
          placeholder="이메일" 
          className="login-input"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input 
          type="tel"
          name="phone"
          placeholder="핸드폰번호 (예: 010-1234-5678)" 
          className="login-input"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input 
          type="password"
          name="password"
          placeholder="비밀번호" 
          className="login-input"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input 
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인" 
          className="login-input"
          value={formData.passwordConfirm}
          onChange={handleInputChange}
        />
        
        <button className="purple-login-btn signup-btn" onClick={handleSignup}>
          회원가입
        </button>
        
        <div className="signup-footer">
          <span className="signup-link-text">이미 계정이 있으신가요? </span>
          <button className="signup-link" onClick={onBack}>
            로그인하기
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
