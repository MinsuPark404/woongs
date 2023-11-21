import React, { useState } from 'react';
import './Domain.css';
import RegisterDomain from './RegisterDomain';
import DomainList from './DomainList';

const List = () => {
  const [items] = useState(['도메인 목록', '도메인 등록']);
  const [activeItem, setActiveItem] = useState(items[0]); // 기본적으로 첫 번째 항목을 활성화

  const handleClick = (item) => {
    setActiveItem(item); // 현재 클릭된 항목으로 activeItem 상태를 설정
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li 
            key={index} 
            className={activeItem === item ? 'active' : ''} // 현재 활성화된 항목에 대해 'active' 클래스를 추가
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      {activeItem === '도메인 목록' && <DomainList />}
      {activeItem === '도메인 등록' && <RegisterDomain />}
    </div>
  );
};

export default List;
