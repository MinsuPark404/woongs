import React, { useState } from 'react';
import './AdminC.css';
import RegisterBusiness from './RegisterBusiness';
import BusinessList from './BusinessList';
import PermissionManagement from './PermissionManagement';
import LogManagement from './LogManagement';

const List = () => {
  const [items] = useState(['사업자 등록', '사업자 목록', '권한 관리', '로그 관리']);
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    if (activeItem === item) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  return (
    <div className="admin-panel">
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            {item}
          </li>
        ))}
      </ul>
      {activeItem === '사업자 등록' && <RegisterBusiness />}
      {activeItem === '사업자 목록' && <BusinessList />}
      {activeItem === '권한 관리' && <PermissionManagement />}
      {activeItem === '로그 관리' && <LogManagement />}
    </div>
  );
};

export default List;
