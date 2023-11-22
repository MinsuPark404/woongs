import React,{ useEffect, useState } from "react";
import axios from "../../axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination, Typography  } from '@mui/material';
import Modal from './Modal';

const fetchEmpList = async () => {
    try {
        // 추후 직원 목록을 불러오는 API를 만들어야 함
        const response = await axios.get('/api/users/');
        console.log("ADMIN LIST",response.data);
        return response.data;
    } catch (error) {
        throw new Error('직원 목록을 불러오는데 실패했습니다.');
    }
};

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const updateEmp = async (updatedEmp) => {
        console.log("updatedAdmin",updatedEmp);
        try {
            // 추후 직원 정보를 수정하는 API를 만들어야 함
            const response = await axios.put(`/api/users/${updatedEmp.user_idx}`, updatedEmp);
            console.log(response);
            setEmployees((preEmployees) =>
            preEmployees.map((emp) =>
            emp.user_id === updatedEmp.admin_id ? { ...emp, ...updatedEmp } : emp
            )
        );
        } catch (error) {
        console.error('업데이트 중 에러가 발생했습니다:', error);
        }
    };
    useEffect(() => {
        const loadEmps = async () => {
            try {
                const empsData = await fetchEmpList();
                setEmployees(empsData); // 관리자 데이터를 상태로 설정
            } catch (error) {
                console.error('직원 목록을 불러오는데 실패했습니다.', error);
            }
        };
        loadEmps();
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
    const openModal = (emp) => {
        setSelectedEmp(emp);
        setIsModalOpen(true);
    };
    const closeModal = () => {
      console.log("closeModal");
      setIsModalOpen(false);
    };
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    const filteredEmployees = employees.filter((emp) =>
        emp.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.user_tel && emp.user_tel.includes(searchTerm))
        );
  
  
    return (
      <Paper >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>직원 목록</Typography>
      <TextField
          label="직원 검색"
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
                  <TableCell style={{ fontWeight: 'bold', color: '#333' }}>직원 이름</TableCell>
                  {/* <TableCell style={{ fontWeight: 'bold', color: '#333' }}>어린이집 이름</TableCell> */}
                  <TableCell style={{ fontWeight: 'bold', color: '#333' }}>전화번호</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#333' }}>이메일</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#333' }}>권한</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#333' }}>수정</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((emp) => (
                  <TableRow key={emp.user_id}>
                      {/* 테이블 데이터 셀 */}
                      <TableCell>{emp.user_name}</TableCell>
                      {/* <TableCell>{emp.business_name}</TableCell> */}
                      <TableCell>{emp.user_tel}</TableCell>
                      <TableCell>{emp.user_email}</TableCell>
                      <TableCell>{emp.user_role}</TableCell>
                      <TableCell>
                          <Button variant="text" color="primary" onClick={() => openModal(emp)}>수정</Button>
                      </TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
          component="div"
          count={filteredEmployees.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  
      <Modal
          isOpen={isModalOpen}
          close={closeModal}
          employee={selectedEmp}
          updateEmployee={updateEmp}
      />
  </Paper>
    );
  };
  
export default List;