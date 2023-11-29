import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // 실제 경로에 맞게 조정해야 합니다.
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, TablePagination } from '@mui/material';
import { useSelector } from 'react-redux';

const ChildList = () => {
    const [children, setChildren] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const data = useSelector((state) => state.user);
    console.log("USER : ",data);
    console.log("USER BNO : ",data.bno)

    const fetchChildren = async () => {
        try {
            const response = await axios.get(`/api/children/${data.bno}`);
            console.log("CHILDREN LIST",response.data);
            setChildren(response.data);
        } catch (error) {
            console.error('Error fetching children data:', error);
        }
    };

    useEffect(() => {
        fetchChildren();
    }, []);

    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // 페이지 번호를 다시 0으로 리셋
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ margin: 2 }}>원생 목록</Typography>
            <TableContainer>
                <Table stickyHeader aria-label="children table">
                    <TableHead>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>나이</TableCell>
                            <TableCell>성별</TableCell>
                            <TableCell>반</TableCell>
                            <TableCell>등록 일자</TableCell>
                            <TableCell>작업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((child) => (
                            <TableRow hover key={child.child_idx}>
                                <TableCell>{child.child_name}</TableCell>
                                <TableCell>{child.child_age}</TableCell>
                                <TableCell>{child.child_gender}</TableCell>
                                <TableCell>{child.child_class}</TableCell>
                                <TableCell>{child.child_created_at}</TableCell>
                                <TableCell>
                                    <Button color="primary">수정</Button>
                                    <Button color="secondary">삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={children.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ChildList;