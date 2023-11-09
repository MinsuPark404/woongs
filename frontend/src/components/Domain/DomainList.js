import React, { useState, useEffect } from 'react';
// import Modal from './Modal';

// fetchBusinesses 함수는 백엔드 API를 호출하여 사업자 목록을 가져옵니다.
const fetchBusinesses = async () => {
  const response = await fetch('http://localhost:5000/api/admins/list'); // 기본적으로 GET 요청
  if (!response.ok) {
    throw new Error('사업자 목록을 불러오는데 실패했습니다.');
  }
  const data = await response.json();
  return data;
};

const DomainList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const updateAdmin = async (updatedAdmin) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admins/update/${updatedAdmin.admin_id}`, {
        method: 'PUT', // 업데이트는 보통 PUT 요청을 사용합니다.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAdmin), // 변경된 객체를 JSON으로 변환하여 전송
      });

      if (!response.ok) {
        throw new Error('관리자 정보 업데이트에 실패했습니다.');
      }

      const result = await response.json();

      // 성공적으로 업데이트되었다면, UI에도 반영
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((admin) =>
          admin.admin_id === updatedAdmin.admin_id ? { ...admin, ...updatedAdmin } : admin
        )
      );
    } catch (error) {
      console.error('업데이트 중 에러가 발생했습니다:', error);
      // 적절한 에러 처리 로직을 구현해야 합니다. 예를 들면, 사용자에게 에러 메시지를 보여주는 것 등
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
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map((admin) => (
                <tr key={admin.admin_id} onClick={() => openModal(admin)}>
                  <td>{admin.admin_name}</td>
                  <td>{admin.admin_business_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
      {/* <Modal isOpen={isModalOpen} close={closeModal} admin={selectedAdmin} updateAdmin={updateAdmin} /> */}
    </div>
  );
};

export default DomainList;