import React, { useState } from 'react';
import './AdminC.css';

const RegisterBusiness = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    registrationNumber: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Business Info Submitted:', businessInfo);
    // 서버에 데이터를 보내는 로직을 여기에 추가하세요.
    // 예: axios.post('/api/businesses', businessInfo);
  };

  return (
    <div className="register-business">
      <h2>Register Business</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Business Name:
          <input
            type="text"
            name="name"
            value={businessInfo.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={businessInfo.registrationNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={businessInfo.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={businessInfo.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
