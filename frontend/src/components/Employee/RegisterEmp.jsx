import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container,Paper } from '@mui/material';
import axios from '../../axios'; // API 호출을 위한 axios 인스턴스
import { useSelector } from 'react-redux';
const RegisterEmployee = () => {
  const [newEmp, setNewEmp] = useState({
    user_email: '',
    user_password: '',
    user_name: '',
    user_tel: '',
    user_role: '',
  });
  const [message, setMessage] = useState('');
  const userData = useSelector((state) => state.user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmp({ ...newEmp, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/', newEmp);
      setMessage('직원 등록 성공!');
      console.log(response);
      // 필드 초기화
      setNewEmp({
        user_email: '',
        user_password: '',
        user_name: '',
        user_tel: '',
        user_role: '',
      });
    } catch (error) {
      setMessage('등록 실패: ' + error.message);
      console.error('Registration error', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">직원 등록</Typography>
      <TextField
        required
        fullWidth
        label="이메일"
        name="user_email"
        value={newEmp.user_email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="비밀번호"
        name="user_password"
        type="password"
        value={newEmp.user_password}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="이름"
        name="user_name"
        value={newEmp.user_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="전화번호"
        name="user_tel"
        value={newEmp.user_tel}
        onChange={handleChange}
        margin="normal"
      />
        <TextField
        required
        fullWidth
        label="직책"
        name="user_role"
        value={newEmp.user_role}
        onChange={handleChange}
        margin="normal"
        />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        등록
      </Button>
      {message && <Typography color="secondary">{message}</Typography>}
    </Box>
    </Paper>
    </Container>
  );
};

export default RegisterEmployee;