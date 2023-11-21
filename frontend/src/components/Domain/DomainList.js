import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, TablePagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('domain');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    console.log('도메인 리스트 조회');
    const fetchData = async () => {
      const data = await axios.get('/api/domains');
      setDomains(data.data);
    };
    fetchData();
  }, []);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterDomains = (domains) => {
    return domains.filter((domain) => {
      const valueToFilter = searchType === 'domain' ? domain.url_addr : domain.business_name;
      return valueToFilter?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const filteredDomains = filterDomains(domains);

  return (
    <Paper style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h6">도메인 목록</Typography>
      <br/>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel id="search-type-label">검색 유형</InputLabel>
          <Select
            labelId="search-type-label"
            id="search-type"
            value={searchType}
            onChange={handleSearchTypeChange}
            label="검색 유형"
          >
            <MenuItem value="domain">도메인</MenuItem>
            <MenuItem value="business">사업자</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="검색"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>도메인 주소</TableCell>
              <TableCell>도메인 상태</TableCell>
              <TableCell>도메인 소유자</TableCell>
              <TableCell>도메인 만료일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDomains.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((domain, index) => (
              <TableRow key={index}>
                <TableCell>{domain.url_addr}</TableCell>
                <TableCell>{domain.url_status}</TableCell>
                <TableCell>{domain.business_name}</TableCell>
                <TableCell>{domain.url_period_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredDomains.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DomainList;
