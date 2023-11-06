import React, { useState } from 'react';
import './AdminC.css'; 
import axios from 'axios';


const RegisterAdmin = () => {
  
  const [adminInfo, setAdminInfo] = useState({
    admin_name: '',
    admin_password: '',
    company_name: '',
    company_address: '',
    company_unique: '',
    admin_email: '',
    admin_phone: '',
    admin_phone2: '',
    role: '',
    is_active: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    const adminData = {
      ...adminInfo,
      is_active: adminInfo.is_active ? 1 : 0,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/admins/register', adminData);
  
      
      setAdminInfo({
        admin_name: '',
        admin_password: '',
        company_name: '',
        company_address: '',
        company_unique: '',
        admin_email: '',
        admin_phone: '',
        admin_phone2: '',
        role: '',
        is_active: ''
      });
  
      alert('가입됨!');
      console.log(response.data);
      
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage('No response received. Check your network connection.');
      } else {
        setMessage('Error: ' + error.message);
      }
      console.error('Registration error', error);
    }
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdminInfo({ ...adminInfo, [name]: checked });
  };

  return (
    <div className="register-business">
      <h2>Register Admin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Admin Name:
          <input
            type="text"
            name="admin_name"
            value={adminInfo.admin_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Admin Password:
          <input
            type="password"
            name="admin_password"
            value={adminInfo.admin_password}
            onChange={handleChange}
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="company_name"
            value={adminInfo.company_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Company Address:
          <input
            type="text"
            name="company_address"
            value={adminInfo.company_address}
            onChange={handleChange}
          />
        </label>
        <label>
          Company Unique Number:
          <input
            type="text"
            name="company_unique"
            value={adminInfo.company_unique}
            onChange={handleChange}
          />
        </label>
        <label>
          Admin Email:
          <input
            type="email"
            name="admin_email"
            value={adminInfo.admin_email}
            onChange={handleChange}
          />
        </label>
        <label>
          Admin Phone:
          <input
            type="tel"
            name="admin_phone"
            pattern="[0-9]{11}"
            value={adminInfo.admin_phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Secondary Admin Phone:
          <input
            type="tel"
            name="admin_phone2"
            pattern="[0-9]{11}"
            value={adminInfo.admin_phone2}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={adminInfo.role}
            onChange={handleChange}
          />
        </label>
        <label>
          Is Active:
          <input
            type="checkbox"
            name="is_active"
            checked={adminInfo.is_active}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
