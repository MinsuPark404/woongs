import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, Container,Paper } from '@mui/material';
import axios from '../../axios'; // API 호출을 위한 axios 인스턴스

const RegisterChild = () => {
  const [childData, setChildData] = useState({
    child_name: '',
    child_age: '',
    child_gender: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData({ ...childData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const businessBno = '1234567890'; // 예시 사업자 번호, 실제로는 동적으로 설정해야 함
      const response = await axios.post(`/api/children/${businessBno}`, childData);
      setMessage('원생이 성공적으로 등록되었습니다.');
      setChildData({
        child_name: '',
        child_age: '',
        child_gender: '',
      });
    } catch (error) {
      setMessage('원생 등록 중 오류가 발생했습니다.');
      console.error('Registration error', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
    <Paper>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">원생 등록</Typography>
      <TextField
        required
        fullWidth
        label="이름"
        name="child_name"
        value={childData.child_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="나이"
        name="child_age"
        value={childData.child_age}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="child-gender-label">성별</InputLabel>
        <Select
          labelId="child-gender-label"
          id="child_gender"
          name="child_gender"
          value={childData.child_gender}
          label="성별"
          onChange={handleChange}
        >
          <MenuItem value="male">남자</MenuItem>
          <MenuItem value="female">여자</MenuItem>
        </Select>
      </FormControl>
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

export default RegisterChild;