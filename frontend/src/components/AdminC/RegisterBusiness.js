import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Button, Container, Paper, Typography,  Select, MenuItem } from '@mui/material';
import axios from '../../axios';

const RegisterAdmin = () => {
  const [step, setStep] = useState(1); // 추가
  
  const [adminInfo, setAdminInfo] = useState({
    admin_name: '',
    admin_password: '',
    admin_email: '',
    admin_tel: '',
    admin_role: '관리자',
    admin_status: true
  });
  
  const [businessInfo, setBusinessInfo] = useState({
    business_name: '',
    business_addr1: '',
    business_addr2: '',
    business_bno: '',
    business_tel: '',
  });
  
  const [message, setMessage] = useState('');

  const handleChangeAdminInfo = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleChangeBusinessInfo = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({ ...businessInfo, [name]: value });
  };

  const handleNext = () => {
    console.log('Admin Info:', adminInfo); // '다음' 버튼을 누를 때 현재 관리자 정보 출력
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    const adminData = {
      ...adminInfo,
      ...businessInfo,
      admin_status: adminInfo.admin_status ? 1 : 0,
    };
    console.log('Admin and Business Info:', adminData); // '회원가입' 버튼을 누를 때 현재 관리자 정보와 어린이집 정보 출력
    try {
      const response = await axios.post('/api/admins/register', adminData);
  
      setAdminInfo({
        admin_name: '',
        admin_password: '',
        business_name: '',
        business_addr1: '',
        business_addr2: '',
        business_bno: '',
        admin_email: '',
        admin_tel: '',
        business_tel: '',
        admin_role: '',
        admin_status: ''
      });

      setBusinessInfo({ // 추가: businessInfo 상태 초기화
        business_name: '',
        business_addr1: '',
        business_addr2: '',
        business_bno: '',
        business_tel: '',
      });
  
      setStep(1); // 추가: step 상태 초기화

      alert('성공적으로 등록되었습니다!');
      console.log(response.data);
      
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage('응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        setMessage('에러: ' + error.message);
      }
      console.error('등록 에러', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdminInfo({ ...adminInfo, [name]: checked });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper >
        <Typography variant="h5" style={{ marginBottom: 20 }}>관리자 등록하기</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {step === 1 ? (
            <>
              <TextField
                label="관리자 아이디"
                type="email"
                name="admin_email"
                value={adminInfo.admin_email}
                onChange={handleChangeAdminInfo}
                fullWidth
              />
              <TextField
                label="관리자 비밀번호"
                type="password"
                name="admin_password"
                value={adminInfo.admin_password}
                onChange={handleChangeAdminInfo}
                fullWidth
              />
              <TextField
                label="관리자 이름"
                type="text"
                name="admin_name"
                value={adminInfo.admin_name}
                onChange={handleChangeAdminInfo}
                fullWidth
              />
              <TextField
                label="관리자 전화번호"
                type="tel"
                name="admin_tel"
                pattern="[0-9]{11}"
                value={adminInfo.admin_tel}
                onChange={handleChangeAdminInfo}
                fullWidth
              />
              <Select
                label="역할"
                name="admin_role"
                value={adminInfo.admin_role}
                onChange={handleChangeAdminInfo}
                fullWidth
              >
                <MenuItem value="null">추후 추가</MenuItem>
                <MenuItem value="관리자">관리자</MenuItem>
                {/* 필요한 만큼 MenuItem을 추가하실 수 있습니다. */}
              </Select>
              <FormControlLabel
                control={<Checkbox checked={adminInfo.admin_status} onChange={handleCheckboxChange} name="admin_status" />}
                label="Is Active"
              />
              <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                다음
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="어린이집 이름"
                type="text"
                name="business_name"
                value={businessInfo.business_name}
                onChange={handleChangeBusinessInfo}
                fullWidth
              />
              <TextField
                label="어린이집 주소"
                type="text"
                name="business_addr1"
                value={businessInfo.business_addr1}
                onChange={handleChangeBusinessInfo}
                fullWidth
              />
              <TextField
                label="어린이집 상세주소"
                type="text"
                name="business_addr2"
                value={businessInfo.business_addr2}
                onChange={handleChangeBusinessInfo}
                fullWidth
              />
              <TextField
                label="사업자등록번호"
                type="text"
                name="business_bno"
                value={businessInfo.business_bno}
                onChange={handleChangeBusinessInfo}
                fullWidth
              />
              <TextField
                label="어린이집 전화번호"
                type="tel"
                name="business_tel"
                pattern="[0-9]{11}"
                value={businessInfo.business_tel}
                onChange={handleChangeBusinessInfo}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                회원가입
              </Button>
            </>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterAdmin;