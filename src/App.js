import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';
import TemplateSelectionPage from './components/TemplateSelectionPage';
// 새로 만든 InvitationEditor 컴포넌트를 import 합니다.
import InvitationEditor from './components/InvitationEditor'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 'editor' 뷰 상태를 추가합니다.
  const [currentView, setCurrentView] = useState('main'); // 'main', 'dashboard', 'template', 'editor'
  const [username] = useState('홍길동');

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
  const handleTemplateSelected = (template) => {
    console.log("선택된 템플릿을 받아옴:", template.title);
    setCurrentView('editor');
  };

  // InvitationEditor에서 뒤로가기 시 'template' 뷰로 변경합니다.
  const handleBackToTemplate = () => {
    setCurrentView('template');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <MainPage onLogin={handleLogin} />;
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