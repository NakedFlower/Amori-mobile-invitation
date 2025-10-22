import React, { useState } from 'react';

function TemplateSelectionPage({ username, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('결혼식 청첩장');

  const categories = ['결혼식 청첩장', '돌잔치 초대장', '감사장'];

  const templates = [
    { id: 1, title: '자체 제작', type: 'custom', icon: '+' },
    { id: 2, title: '#우아 #로맨틱', type: 'template', hashtags: ['우아', '로맨틱'] },
    { id: 3, title: '#심플', type: 'template', hashtags: ['심플'] },
    { id: 4, title: '#여름', type: 'template', hashtags: ['여름'] },
    { id: 5, title: '#야외웨딩', type: 'template', hashtags: ['야외웨딩'] },
    { id: 6, title: '#가을', type: 'template', hashtags: ['가을'] },
    { id: 7, title: '#겨울', type: 'template', hashtags: ['겨울'] },
    { id: 8, title: '#깜찍 발랄', type: 'template', hashtags: ['깜찍', '발랄'] },
  ];

  const handleTemplateSelect = (template) => {
    console.log(`선택된 템플릿: ${template.title}`);
    // 여기에 템플릿 선택 후 다음 단계로 이동하는 로직을 추가할 수 있습니다
  };

  return (
    <main className="template-selection-content">
      <div className="welcome-section">
        <h2 className="welcome-text">{username}님, 반갑습니다.</h2>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Section */}
      <div className="templates-section">
        <h3 className="section-title">템플릿</h3>
        <div className="templates-grid">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className={`template-card ${template.type === 'custom' ? 'custom-template' : ''}`}
              onClick={() => handleTemplateSelect(template)}
            >
              {template.type === 'custom' ? (
                <div className="custom-template-content">
                  <div className="plus-icon">{template.icon}</div>
                  <div className="template-title">{template.title}</div>
                </div>
              ) : (
                <div className="template-content">
                  <div className="template-title">{template.title}</div>
                  {template.hashtags && (
                    <div className="template-hashtags">
                      {template.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="back-section">
        <button className="back-btn" onClick={onBack}>
          ← 뒤로가기
        </button>
      </div>
    </main>
  );
}

export default TemplateSelectionPage;
