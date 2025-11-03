import React, { useState } from 'react';
import { signup } from '../services/api';
import { Button, Input, Form } from 'antd';
import './SignupPage.css';

function SignupPage({ onBack, onSignup }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  });
  // const [profileImage, setProfileImage] = useState(null);  // 임시 비활성화
  // const [previewUrl, setPreviewUrl] = useState(null);  // 임시 비활성화

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSignup = async () => {
    // 유효성 검사
    if (!formData.name || !formData.email || !formData.password) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    if (formData.password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // FormData 생성
      const apiFormData = new FormData();
      apiFormData.append('name', formData.name);
      apiFormData.append('email', formData.email);
      apiFormData.append('password', formData.password);
      if (formData.phone) {
        apiFormData.append('phone', formData.phone);
      }
      // 프로필 이미지 업로드 임시 비활성화
      // if (profileImage) {
      //   apiFormData.append('profile_image', profileImage);
      // }

      // API 호출
      const response = await signup(apiFormData);
      alert(`회원가입 성공! ${response.name}님 환영합니다.`);
      
      // 로그인 페이지로 이동
      if (onBack) {
        onBack();
      }
    } catch (error) {
      alert(error.message);
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <main className="main-content">
      <div className="content-text">
        <h2 className="main-title">회원가입</h2>
        <p className="subtitle">Amori와 함께 시작하세요</p>
      </div>
      
      <Form className="signup-form">
        <Input 
          type="text"
          name="name"
          placeholder="이름" 
          className="login-input"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input 
          type="email"
          name="email"
          placeholder="이메일" 
          className="login-input"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input 
          type="tel"
          name="phone"
          placeholder="핸드폰번호 (예: 010-1234-5678)" 
          className="login-input"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Input.Password
          name="password"
          placeholder="비밀번호" 
          className="login-input"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Input.Password
          name="passwordConfirm"
          placeholder="비밀번호 확인" 
          className="login-input"
          value={formData.passwordConfirm}
          onChange={handleInputChange}
        />
        
        <Button className="purple-login-btn signup-btn" onClick={handleSignup}>
          회원가입
        </Button>
        
        <div className="signup-footer">
          <span className="signup-link-text">이미 계정이 있으신가요? </span>
          <Button type="text" className="signup-link" onClick={onBack}>
            로그인하기
          </Button>
        </div>
      </Form>
    </main>
  );
}

export default SignupPage;
