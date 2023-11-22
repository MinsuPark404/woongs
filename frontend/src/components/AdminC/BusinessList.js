import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from '../../axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination, Typography  } from '@mui/material';

// fetchBusinesses 함수는 백엔드 API를 호출하여 사업자 목록을 가져옵니다.
const fetchBusinesses = async () => {
  try {
    const response = await axios.get('/api/admins/list');
    console.log("ADMIN LIST",response.data);
    return response.data;
  } catch (error) {
    throw new Error('사업자 목록을 불러오는데 실패했습니다.');
  }
};

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const updateAdmin = async (updatedAdmin) => {
    console.log("updatedAdmin",updatedAdmin);
    try {
      const response = await axios.put(`/api/admins/update/${updatedAdmin.admin_idx}`, updatedAdmin);
      console.log(response);
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((admin) =>
          admin.admin_id === updatedAdmin.admin_id ? { ...admin, ...updatedAdmin } : admin
        )
      );
    } catch (error) {
      console.error('업데이트 중 에러가 발생했습니다:', error);
    }
  };
  

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const adminsData = await fetchBusinesses();
        setBusinesses(adminsData); // 관리자 데이터를 상태로 설정
      } catch (error) {
        console.error('사업자 목록을 불러오는데 실패했습니다.', error);
      }
    };

    loadBusinesses();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 페이지 번호를 다시 0으로 리셋
  };
  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    console.log("closeModal");
    setIsModalOpen(false);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBusinesses = businesses.filter((admin) =>
    admin.admin_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (admin.admin_phone && admin.admin_phone.includes(searchTerm))
  );



  return (
    <Paper >
    <Typography variant="h6" sx={{ marginBottom: 2 }}>사업자 목록</Typography>
    <TextField
        label="사업자 검색"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: 20 }}
    />
    <TableContainer>
    <Table>
        <TableHead>
            <TableRow style={{backgroundColor: '#f5f5f5'}}>
                {/* 테이블 헤더 */}
                <TableCell style={{ fontWeight: 'bold', color: '#333' }}>사업자 이름</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: '#333' }}>어린이집 이름</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: '#333' }}>전화번호</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: '#333' }}>이메일</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: '#333' }}>권한</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: '#333' }}>수정</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {filteredBusinesses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((admin) => (
                <TableRow key={admin.admin_id}>
                    {/* 테이블 데이터 셀 */}
                    <TableCell>{admin.admin_name}</TableCell>
                    <TableCell>{admin.business_name}</TableCell>
                    <TableCell>{admin.admin_tel}</TableCell>
                    <TableCell>{admin.admin_email}</TableCell>
                    <TableCell>{admin.admin_role}</TableCell>
                    <TableCell>
                        <Button variant="text" color="primary" onClick={() => openModal(admin)}>수정</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
        component="div"
        count={filteredBusinesses.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    <Modal
        isOpen={isModalOpen}
        close={closeModal}
        admin={selectedAdmin}
        updateAdmin={updateAdmin}
    />
</Paper>
  );
};

export default BusinessList;