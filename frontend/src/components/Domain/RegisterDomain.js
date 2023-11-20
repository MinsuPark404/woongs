import React, { useEffect, useState } from 'react';
import './Domain.css'; 
// import axios from 'axios';
import axios from '../../axios';

const RegisterDomain = () => {
  
  const [urlInfo, setUrlInfo] = useState({
    // url_idx: '',
    url_addr: '',
    url_status: '',
    business_idx: '',
    url_archived_at: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrlInfo({ ...urlInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    const adminData = {
      ...urlInfo,
    };
  
    // try {
    //   // const response = await axios.post('/api/admins/register', adminData);
    //   // alert('가입됨!');
    //   // console.log(response.data)
    // } catch (error) {
    //   if (error.response) {
    //     setMessage(error.response.data.message);
    //   } else if (error.request) {
    //     setMessage('No response received. Check your network connection.');
    //   } else {
    //     setMessage('Error: ' + error.message);
    //   }
    //   console.error('Registration error', error);
    // }
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUrlInfo({ ...urlInfo, [name]: checked });
  };
  useEffect(() => {
    console.log('도메인 등록', urlInfo);
  },[urlInfo]);
  return (
  <div className="register-domain">
    <h2>도메인 등록</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="url_addr">도메인 주소</label>
        <input
          type="text"
          id="url_addr"
          name="url_addr"
          value={urlInfo.url_addr}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="url_status">도메인 상태</label>
        <input
          type="checkbox"
          id="url_status"
          name="url_status"
          checked={urlInfo.url_status}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="business_idx">사업자 번호</label>
        <input
          type="text"
          id="business_idx"
          name="business_idx"
          value={urlInfo.business_idx}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="url_archived_at">도메인 등록일</label>
        <input
          type="date"
          id="url_archived_at"
          name="url_archived_at"
          value={urlInfo.url_archived_at}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">등록</button>
      {message && <p className="message">{message}</p>}
    </form>
  </div>
  
  );
};

export default RegisterDomain;
