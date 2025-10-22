import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';
import TemplateSelectionPage from './components/TemplateSelectionPage';
import InvitationEditor from './components/InvitationEditor';
import SignupPage from './components/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 'editor', 'signup' 뷰 상태를 추가합니다.
  const [currentView, setCurrentView] = useState('main'); // 'main', 'signup', 'dashboard', 'template', 'editor'
  const [username] = useState('홍길동');
  const [selectedInvitationType, setSelectedInvitationType] = useState('결혼식 청첩장'); // 초대장 타입 저장

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('main');
  };

  const handleNewCreationClick = () => {
    setCurrentView('template');
  };

  // TemplateSelectionPage에서 템플릿이 선택되면 'editor' 뷰로 변경합니다.
  const handleTemplateSelected = (template, invitationType) => {
    console.log("선택된 템플릿을 받아옴:", template.title);
    console.log("선택된 초대장 타입:", invitationType);
    setSelectedInvitationType(invitationType);
    setCurrentView('editor');
  };

  // InvitationEditor에서 뒤로가기 시 'template' 뷰로 변경합니다.
  const handleBackToTemplate = () => {
    setCurrentView('template');
  };

  const handleSignupClick = () => {
    setCurrentView('signup');
  };

  const handleSignup = (formData) => {
    console.log("회원가입 데이터:", formData);
    // 회원가입 로직 처리 후 로그인 페이지로
    setCurrentView('main');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
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
        return <Dashboard username={username} onLogout={handleLogout} onNewCreationClick={handleNewCreationClick} />;
      case 'template':
        // onTemplateSelected prop을 전달합니다.
        return <TemplateSelectionPage 
                  username={username} 
                  onTemplateSelected={handleTemplateSelected} 
                />;
      // 'editor' 뷰 케이스를 추가합니다.
      case 'editor':
        return <InvitationEditor 
                  username={username} 
                  invitationType={selectedInvitationType} // 선택된 초대장 타입 전달
                  onBack={handleBackToTemplate} // 첫 단계에서 뒤로가기 시 템플릿 선택으로
                />;
      default:
        return <MainPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {renderContent()}
    </div>
  );
}

export default App;