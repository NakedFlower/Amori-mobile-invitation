import React, { useState } from 'react';

// 'onBack' prop이 더 이상 필요하지 않으므로 props 목록에서 제거합니다.
function TemplateSelectionPage({ username }) {
  const [selectedCategory, setSelectedCategory] = useState('결혼식 청첩장');

  const categories = ['결혼식 청첩장', '돌잔치 초대장', '감사장'];

  // 이미지에 맞게 title을 수정하고, 불필요한 hashtags 속성을 제거합니다.
  const templates = [
    { id: 1, title: '자체 제작', type: 'custom', icon: '+' },
    { id: 2, title: '결혼식 템플릿 #우아 #로맨틱', type: 'template' },
    { id: 3, title: '결혼식 템플릿 #심플', type: 'template' },
    { id: 4, title: '결혼식 템플릿 #여름', type: 'template' },
    { id: 5, title: '결혼식 템플릿 #야외웨딩', type: 'template' },
    { id: 6, title: '결혼식 템플릿 #가을', type: 'template' },
    { id: 7, title: '결혼식 템플릿 #겨울', type: 'template' },
    { id: 8, title: '결혼식 템플릿 #깜찍 발랄', type: 'template' },
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
                // hashtags 렌더링 로직을 제거하고 title만 표시하도록 단순화
                <div className="template-content">
                  <div className="template-title">{template.title}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* '뒤로가기' 버튼 섹션이 이미지에 없으므로 삭제합니다. */}
    </main>
  );
}

export default TemplateSelectionPage;