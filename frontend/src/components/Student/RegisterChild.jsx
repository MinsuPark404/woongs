import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, Container,Paper } from '@mui/material';
import axios from '../../axios'; // API 호출을 위한 axios 인스턴스
import { useSelector } from 'react-redux';


const RegisterChild = () => {

  const [childData, setChildData] = useState({
    child_name: '',
    child_age: '',
    child_gender: '',
    child_class: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData({ ...childData, [name]: value });
  };
  const userData = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const businessBno = userData.bno;
      const response = await axios.post(`/api/children/${businessBno}`, childData);
      setMessage(response.data.message);
      setChildData({
        child_name: '',
        child_age: '',
        child_gender: '',
        child_class: '',
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
      <TextField
        required
        fullWidth
        label="반"
        name="child_class"
        value={childData.child_class}
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