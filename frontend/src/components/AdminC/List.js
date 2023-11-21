import React, { useState } from 'react';
import './AdminC.css';
import RegisterBusiness from './RegisterBusiness';
import BusinessList from './BusinessList';
import LogManagement from './LogManagement';

const List = () => {
  const [items] = useState(['사업자 등록', '사업자 목록', '로그 관리']);
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
      {activeItem === '사업자 등록' && <RegisterBusiness />}
      {activeItem === '사업자 목록' && <BusinessList />}
      {/* {activeItem === '권한 관리' && <PermissionManagement />} */}
      {activeItem === '로그 관리' && <LogManagement />}
    </div>
  );
};

export default List;
