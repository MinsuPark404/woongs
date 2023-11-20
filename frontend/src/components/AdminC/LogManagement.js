import React, { useEffect, useState } from 'react';
import './AdminC.css';
import axios from '../../axios';

const LogManager = () => {

  const [searchFilters, setSearchFilters] = useState({
    logInfo: '',
    logIp: '',
    logDate: '',
    logOutDate: ''
  });
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admins/logs');
        console.log(response.data.data);
        setLogs(response.data.data);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearch = () => {

  };


  return (

    <div className='container'>

      <h2 className='header'>로그 관리</h2>
      <div className='filters'>
        <label className='filterLabel'>
          로그 ID:
          <input
            type="text"
            name="logInfo"
            className='filterInput'
            value={searchFilters.logInfo}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          로그 IP:
          <input
            type="text"
            name="logIp"
            value={searchFilters.logIp}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          로그 날짜 시작:
          <input
            type="date"
            name="startDate"
            value={searchFilters.startDate}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          로그 날짜 끝:
          <input
            type="date"
            name="endDate"
            value={searchFilters.endDate}
            onChange={handleFilterChange}
          />
        </label>
        <div className='buttons'>
          <button onClick='handleSearch'>검색</button>
          <button onClick='handleReset'>초기화</button>
        </div>
      </div>
      <div className='tableContainer'>
        <h3>로그 목록</h3>
        <table className='table'>


          <thead>
            <tr>
              <th>로그 인덱스</th>
              <th>로그 날짜</th>
              <th>로그 정보</th>
              <th>로그 IP</th>
              <th>로그아웃 날짜</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5">로그 정보가 없다!</td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.cms_log_idx}</td>
                  <td>{log.logged_at}</td>
                  <td>{log.log_info}</td>
                  <td>{log.log_ip}</td>
                  <td>{log.logouted_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogManager;
