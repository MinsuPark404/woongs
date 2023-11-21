import React, { useEffect, useState } from 'react';
import './Domain.css'; 
// import axios from 'axios';
import axios from '../../axios';


const RegisterDomain = () => {
  
  const [urlInfo, setUrlInfo] = useState({
    // url_idx: '',
    url_addr: '',
    url_status: '활성화',
    business_bno: '',
    url_archived_at: '',
    url_period_at: '',
  });
  const buttonRef = React.useRef();
  const toggleStatus = () => {
    setUrlInfo({
      ...urlInfo,
      url_status: urlInfo.url_status === '비활성화' ? '활성화' : '비활성화',
    });
  };
  // 버튼이 비활성화 상테일때 tomato 색
  useEffect(() => {
    if (urlInfo.url_status === '비활성화') {
      buttonRef.current.style.backgroundColor = 'tomato';
    } else {
      buttonRef.current.style.backgroundColor = '#4CAF50';
    }
  }, [urlInfo.url_status]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrlInfo({ ...urlInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setMessage('');
    const adminData = {
      ...urlInfo,
    };
    try {
      const res = await axios.post('/api/domains/register', adminData);
      console.log(res);
    } catch (err) {
      console.log(err.response);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    console.log('도메인 등록', urlInfo);
  },[urlInfo]);
  return (
    <div>
    <h2>도메인 등록</h2>
  <div className="register-domain">
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
        <button type="button" className='button-status' onClick={toggleStatus} ref={buttonRef}>
        {urlInfo.url_status === '활성화' ? '활성화' : '비활성화'}
      </button>
      </div>
      <div className="form-group">
        <label htmlFor="business_bno">사업자 번호</label>
        <input
          type="text"
          id="business_bno"
          name="business_bno"
          value={urlInfo.business_bno}
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
      <div className="form-group">
        <label htmlFor="url_period">도메인 만료기한</label>
        <input
          type="date"
          id="url_period_at"
          name="url_period_at"
          value={urlInfo.url_period_at}
          onChange={handleChange}
          required
        />
      </div>
      <div className='button-box'>
        <button className='button-reg' onClick={handleSubmit}>등록</button>
      </div>
      {message && <p className="message">{message}</p>}
    </form>
  </div>
  </div>
  
  );
};

export default RegisterDomain;
