import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from '../../axios';

// fetchBusinesses 함수는 백엔드 API를 호출하여 사업자 목록을 가져옵니다.
const fetchBusinesses = async () => {
  try {
    const response = await axios.get('/api/admins/list');
    console.log("ADMIN LIST",response.data);
    return response.data;
  } catch (error) {
    throw new Error('사업자 목록을 불러오는데 실패했습니다.');
  }
};

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const updateAdmin = async (updatedAdmin) => {
    console.log("updatedAdmin",updatedAdmin);
    try {
      const response = await axios.put(`/api/admins/update/${updatedAdmin.admin_idx}`, updatedAdmin);
      console.log(response);
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((admin) =>
          admin.admin_id === updatedAdmin.admin_id ? { ...admin, ...updatedAdmin } : admin
        )
      );
    } catch (error) {
      console.error('업데이트 중 에러가 발생했습니다:', error);
    }
  };
  

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const adminsData = await fetchBusinesses();
        setBusinesses(adminsData); // 관리자 데이터를 상태로 설정
      } catch (error) {
        console.error('사업자 목록을 불러오는데 실패했습니다.', error);
      }
    };

    loadBusinesses();
  }, []);

  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBusinesses = businesses.filter((admin) =>
    admin.admin_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (admin.admin_phone && admin.admin_phone.includes(searchTerm))
  );



  return (
    <div>
      <h2>사업자 목록</h2>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="사업자 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-container">
        {filteredBusinesses.length > 0 ? (
          <table className="business-table">
            <thead>
              <tr>
                <th>사업자 이름</th>
                <th>어린이집 이름</th>
                <th>전화번호</th>
                <th>이메일</th>
                <th>권한</th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map((admin) => (
                <tr key={admin.admin_id} onClick={() => openModal(admin)}>
                  <td>{admin.admin_name}</td>
                  <td>{admin.business_name}</td>
                  <td>{admin.admin_tel}</td>
                  <td>{admin.admin_email}</td>
                  <td>{admin.admin_role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
      <Modal isOpen={isModalOpen} close={closeModal} admin={selectedAdmin} updateAdmin={updateAdmin} />
    </div>
  );
};

export default BusinessList;