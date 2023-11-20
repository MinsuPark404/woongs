import React, { useState, useEffect } from 'react';
// import Modal from './Modal';
import axios from '../../axios';


const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    console.log('도메인 리스트 조회');
    const fetchData = async () => {
      const data = await axios.get('/api/domains');
      // console.log(data.data);
      setDomains(data.data);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filterDomains = (domains) => {
    return domains
      .filter((domain) =>
        domain.url_addr.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };
  const remainDate = (url_period) =>{
    const today = new Date();
    const expireDate = new Date(url_period);
    const remainTime = expireDate.getTime() - today.getTime();
    const remainDay = Math.floor(remainTime / (1000 * 60 * 60 * 24));
    return remainDay;
  }
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
                <th>도메인 남은 날자(Day)</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains.map((domains) => (
                <tr key={domains.url_idx}>
                  <td>{domains.url_addr}</td>
                  <td>{domains.url_status}</td>
                  <td>{domains.business_name}</td>
                  <td>{domains.url_period}</td>
                  <td>{remainDate(domains.url_period)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
        
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(domains.length / itemsPerPage)).keys()].map(
          (page) => (
            <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DomainList;