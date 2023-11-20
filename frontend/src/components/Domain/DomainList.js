import React, { useState, useEffect } from 'react';
// import Modal from './Modal';
import axios from '../../axios';


const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('도메인 리스트 조회');
    setDomains([
      {
        url_idx: 1,
        url_addr: 'www.kin1.com',
        url_status: 'T',
        business_idx: '1',
        url_archived_at: '2023.01.01',
      },
      {
        url_idx: 2,
        url_addr: 'www.kin2.com',
        url_status: 'T',
        business_idx: '1',
        url_archived_at: '2023.01.01',
      },
      {
        url_idx: 3,
        url_addr: 'www.kin3.com',
        url_status: 'T',
        business_idx: '1',
        url_archived_at: '2023.01.01',
      },
    ]);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterDomains = (domains) => {
    return domains.filter((domain) =>
      domain.url_addr.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredDomains = filterDomains(domains);
  return (
    <div>
      <h2>도메인 목록</h2>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="사업자 검색..."
          // value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-container">
        {filteredDomains.length > 0 ? (
          <table className="business-table">
            <thead>
              <tr>
                <th>도메인 주소</th>
                <th>도메인 상태</th>
                <th>도메인 소유자</th>
                <th>도메인 만료일</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains.map((domains) => (
                <tr key={domains.url_idx}>
                  <td>{domains.url_addr}</td>
                  <td>{domains.url_status}</td>
                  <td>{domains.business_idx}</td>
                  <td>{domains.url_archived_at}</td>
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