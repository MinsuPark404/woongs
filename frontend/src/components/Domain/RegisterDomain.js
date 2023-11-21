import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Switch, Paper, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import './Domain.css'
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
  const toggleStatus = () => {
    setUrlInfo({
      ...urlInfo,
      url_status: urlInfo.url_status === '비활성화' ? '활성화' : '비활성화',
    });
  };
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
    <>
    <br></br>
    <br></br>
    <Paper style={{ padding: 20, margin: 'auto', maxWidth: 500 }}>
      <Typography variant="h6" style={{ marginBottom: 20 }}>도메인 등록</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TextField
          label="도메인 주소"
          type="text"
          name="url_addr"
          value={urlInfo.url_addr}
          onChange={handleChange}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>도메인 상태</InputLabel>
          <Select
            value={urlInfo.url_status}
            name="url_status"
            onChange={handleChange}
            label="도메인 상태"
          >
            <MenuItem value="활성화">활성화</MenuItem>
            <MenuItem value="비활성화">비활성화</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="사업자 번호"
          type="text"
          name="business_bno"
          value={urlInfo.business_bno}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="도메인 등록일"
          type="date"
          name="url_archived_at"
          value={urlInfo.url_archived_at}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="도메인 만료기한"
          type="date"
          name="url_period_at"
          value={urlInfo.url_period_at}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          등록
        </Button>
      </form>
    </Paper>
    <br></br>
    <br></br>
    </>
  );
};

export default RegisterDomain;
