import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // 실제 경로에 맞게 조정해야 합니다.
import { useSelector } from 'react-redux';

const ChildList = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const userData = useSelector((state) => state.user);
  const bno = userData.bno;
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(`/api/children/${bno}`);
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children data:', error);
      }
    };

    fetchChildren();
  }, [bno]);

  const handleSelectChild = (child) => {
    setSelectedChild(child);
  };

  return (
    <div>
      <h2>원생 목록</h2>
      <ul>
        {children.map((child) => (
          <li key={child.child_idx}>
            {child.child_name}
            <button onClick={() => handleSelectChild(child)}>선택</button>
          </li>
        ))}
      </ul>
      {selectedChild && (
        <div>
          <h3>선택한 원생 정보</h3>
          <p>이름: {selectedChild.child_name}</p>
          {/* 기타 원생 정보 표시 */}
        </div>
      )}
    </div>
  );
};

export default ChildList;
