import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from '../../axios';

const LogManager = () => {

  const [searchFilters, setSearchFilters] = useState({
    logInfo: '',
    logIp: '',
    logDate: '',
    logOutDate: ''
  });
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admins/logs');
        console.log(response.data.data);
        setLogs(response.data.data);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearch = () => {

  };
  const handleReset = () => {
      
    }


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" style={{ margin: '20px 0' }}>로그 관리</Typography>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: 20 }}>
          <TextField
            label="로그 ID"
            type="text"
            name="logInfo"
            value={searchFilters.logInfo}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="로그 IP"
            type="text"
            name="logIp"
            value={searchFilters.logIp}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="로그 날짜 시작"
            type="date"
            name="startDate"
            value={searchFilters.startDate}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="로그 날짜 끝"
            type="date"
            name="endDate"
            value={searchFilters.endDate}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
          <Button variant="outlined" onClick={handleReset}>초기화</Button>
        </div>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>로그 인덱스</TableCell>
              <TableCell>로그 날짜</TableCell>
              <TableCell>로그 정보</TableCell>
              <TableCell>로그 IP</TableCell>
              <TableCell>로그아웃 날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5">로그 정보가 없습니다.</TableCell>
              </TableRow>
            ) : (
              logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.cms_log_idx}</TableCell>
                  <TableCell>{log.logged_at}</TableCell>
                  <TableCell>{log.log_info}</TableCell>
                  <TableCell>{log.log_ip}</TableCell>
                  <TableCell>{log.logouted_at}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
              };

export default LogManager;
