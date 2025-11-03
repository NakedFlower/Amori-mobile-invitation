import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Space } from 'antd';
import './Header.css';

const { Header: AntHeader } = Layout;

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  };

  const handleCreateClick = () => {
    if (isLoggedIn) {
      navigate('/template');
    }
  };

  const handleHistoryClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  };

  return (
    <AntHeader className="header">
      <div className="header-left">
        <h1 
          className="brand" 
          onClick={handleBrandClick}
          style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}
        >
          Amori
        </h1>
      </div>
      <nav className="header-nav">
        <Button type="text" onClick={handleCreateClick} className="nav-link">제작하기</Button>
        <Button type="text" onClick={handleHistoryClick} className="nav-link">제작내역</Button>
        <Button type="text" className="nav-link">스마트스토어</Button>
      </nav>
      <div className="header-right">
        {isLoggedIn && (
          <Space size="large" style={{ marginRight: '20px' }}>
            <div className="cart-section">
              <div className="cart-icon">
                <span className="cart-badge">0</span>
              </div>
              <span className="cart-text">Cart</span>
            </div>
            <Button onClick={onLogout} className="logout-btn">로그아웃</Button>
          </Space>
        )}
      </div>
    </AntHeader>
  );
}

export default Header;
