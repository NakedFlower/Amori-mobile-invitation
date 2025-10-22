import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';
import TemplateSelectionPage from './components/TemplateSelectionPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'dashboard', 'template'
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

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <MainPage onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard username={username} onLogout={handleLogout} onNewCreationClick={handleNewCreationClick} />;
      case 'template':
        return <TemplateSelectionPage username={username} onBack={handleBackToDashboard} />;
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
