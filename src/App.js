import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';
import TemplateSelectionPage from './components/TemplateSelectionPage';
import InvitationEditor from './components/InvitationEditor';
import InvitationCreator from './components/InvitationCreator';
import SignupPage from './components/SignupPage';
import { getCurrentUser, isLoggedIn as checkLogin, logout as apiLogout, getStoredUser } from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 'editor', 'signup', 'creator' 뷰 상태를 추가합니다.
  const [currentView, setCurrentView] = useState('main'); // 'main', 'signup', 'dashboard', 'template', 'editor', 'creator'
  const [user, setUser] = useState(null); // 실제 사용자 정보
  const [selectedInvitationType, setSelectedInvitationType] = useState('결혼식 청첩장'); // 초대장 타입 저장

  // 앱 로드 시 로그인 상태 확인
  useEffect(() => {
    const initAuth = async () => {
      if (checkLogin()) {
        try {
          // 저장된 사용자 정보로 먼저 표시
          const storedUser = getStoredUser();
          if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
            setCurrentView('dashboard');
          }
          
          // 서버에서 최신 정보 가져오기
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('인증 확인 실패:', error);
          setIsLoggedIn(false);
          setUser(null);
          setCurrentView('main');
        }
      }
    };
    initAuth();
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentView('dashboard');
    window.history.pushState({}, '', '/dashboard');
  };

  const handleLogout = () => {
    apiLogout();
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView('main');
    window.history.pushState({}, '', '/');
  };

  const handleNewCreationClick = () => {
    setCurrentView('template');
    window.history.pushState({}, '', '/template');
  };

  // TemplateSelectionPage에서 템플릿이 선택되면 'editor' 뷰로 변경합니다.
  const handleTemplateSelected = (template, invitationType) => {
    console.log("선택된 템플릿을 받아옴:", template.title);
    console.log("선택된 초대장 타입:", invitationType);
    setSelectedInvitationType(invitationType);
    setCurrentView('editor');
    window.history.pushState({}, '', '/editor');
  };

  // InvitationEditor에서 뒤로가기 시 'template' 뷰로 변경합니다.
  const handleBackToTemplate = () => {
    setCurrentView('template');
    window.history.pushState({}, '', '/template');
  };

  // 청첩장 생성하러 가기
  const handleGoToCreator = () => {
    setCurrentView('creator');
    window.history.pushState({}, '', '/creator');
  };

  // Creator에서 뒤로가기
  const handleBackFromCreator = () => {
    setCurrentView('dashboard');
    window.history.pushState({}, '', '/dashboard');
  };

  const handleSignupClick = () => {
    setCurrentView('signup');
    window.history.pushState({}, '', '/signup');
  };

  const handleSignup = (formData) => {
    console.log("회원가입 데이터:", formData);
    // 회원가입 로직 처리 후 로그인 페이지로
    setCurrentView('main');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    window.history.pushState({}, '', '/');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      if (currentView === 'signup') {
        return <SignupPage onBack={handleBackToMain} onSignup={handleSignup} />;
      }
      return <MainPage onLogin={handleLogin} onSignupClick={handleSignupClick} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard username={user?.name || '게스트'} onLogout={handleLogout} onNewCreationClick={handleNewCreationClick} />;
      case 'template':
        // onTemplateSelected prop을 전달합니다.
        return <TemplateSelectionPage 
                  username={user?.name || '게스트'} 
                  onTemplateSelected={handleTemplateSelected} 
                />;
      // 'editor' 뷰 케이스를 추가합니다.
      case 'editor':
        return <InvitationEditor 
                  username={user?.name || '게스트'} 
                  invitationType={selectedInvitationType} // 선택된 초대장 타입 전달
                  onBack={handleBackToTemplate} // 첫 단계에서 뒤로가기 시 템플릿 선택으로
                  onNext={handleGoToCreator} // 마지막 단계에서 creator로
                />;
      case 'creator':
        return <InvitationCreator 
                  username={user?.name || '게스트'}
                  onBack={handleBackFromCreator}
                />;
      default:
        return <MainPage onLogin={handleLogin} />;
    }
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.history.pushState({}, '', `/${view === 'main' ? '' : view}`);
  };

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate}
      />
      {renderContent()}
    </div>
  );
}

export default App;