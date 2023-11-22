import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem } from '@mui/material';
import axios from '../../axios';

const AttendanceManagement = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [children, setChildren] = useState([]); // 원생 목록 상태
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedChild, setSelectedChild] = useState('');

    // 원생 목록 가져오기
    const fetchChildren = async () => {
        try {
            const response = await axios.get('/api/children/');
            setChildren(response.data);
        } catch (error) {
            console.error('Error fetching children data:', error);
        }
    };

    useEffect(() => {
        fetchChildren(); // 컴포넌트 마운트 시 원생 목록 가져오기
        fetchAttendance(); // 선택된 날짜에 대한 출석 정보 가져오기
    }, []);
    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`/api/children/attendance/${selectedDate}`);
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleChildChange = (event) => {
        setSelectedChild(event.target.value);
    };

    return (
        <Paper sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h6">원생 출석 관리</Typography>
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <TextField
                    type="date"
                    label="날짜 선택"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <Select
                    value={selectedChild}
                    onChange={handleChildChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">원생 선택</MenuItem>
                    {children.map((child) => (
                        <MenuItem key={child.child_idx} value={child.child_idx}>
                            {child.child_name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" onClick={fetchAttendance}>조회</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="attendance table">
                    <TableHead>
                        <TableRow>
                            <TableCell>원생 ID</TableCell>
                            <TableCell align="right">이름</TableCell>
                            <TableCell align="right">출석 상태</TableCell>
                            <TableCell align="right">출석 시간</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData.map((row) => (
                            <TableRow
                                key={row.child_idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.child_idx}
                                </TableCell>
                                <TableCell align="right">{row.child_name}</TableCell>
                                <TableCell align="right">{row.attendance_status}</TableCell>
                                <TableCell align="right">{row.attendance_time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AttendanceManagement;