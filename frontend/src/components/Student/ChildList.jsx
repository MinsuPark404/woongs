import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // 실제 경로에 맞게 조정해야 합니다.
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';

const ChildList = () => {
    const [children, setChildren] = useState([]);

    const fetchChildren = async () => {
        try {
            const response = await axios.get('/api/children');
            console.log(response.data);
            setChildren(response.data);
        } catch (error) {
            console.error('Error fetching children data:', error);
        }
    };

    useEffect(() => {
        fetchChildren();
    }, []);

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
                        {children.map((child) => (
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
        </Paper>
    );
};

export default ChildList;