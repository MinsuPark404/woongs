import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Button, Container, Paper, Typography } from '@mui/material';
import axios from '../../axios';

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
      const response = await axios.post('/api/admins/register', adminData);
  
      
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
    <Container component="main" maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" style={{ marginBottom: 20 }}>Register Admin</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField
            label="Admin Name"
            type="text"
            name="admin_name"
            value={adminInfo.admin_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Admin Password"
            type="password"
            name="admin_password"
            value={adminInfo.admin_password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Company Name"
            type="text"
            name="company_name"
            value={adminInfo.company_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Company Address"
            type="text"
            name="company_address"
            value={adminInfo.company_address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Company Unique Number"
            type="text"
            name="company_unique"
            value={adminInfo.company_unique}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Admin Email"
            type="email"
            name="admin_email"
            value={adminInfo.admin_email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Admin Phone"
            type="tel"
            name="admin_phone"
            pattern="[0-9]{11}"
            value={adminInfo.admin_phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Secondary Admin Phone"
            type="tel"
            name="admin_phone2"
            pattern="[0-9]{11}"
            value={adminInfo.admin_phone2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Role"
            type="text"
            name="role"
            value={adminInfo.role}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox checked={adminInfo.is_active} onChange={handleCheckboxChange} name="is_active" />}
            label="Is Active"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterAdmin;
