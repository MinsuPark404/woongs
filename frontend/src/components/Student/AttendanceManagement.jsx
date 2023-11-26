import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';

const AttendanceManagement = () => {
  // 원생 목록 상태
  const [children, setChildren] = useState([]);

  // 원생 출석 목록 상태
  const [attendanceList, setAttendanceList] = useState([]);

  // 현재 선택된 원생 ID 상태
  const [selectedChildId, setSelectedChildId] = useState(null);

  // 출석 기록을 위한 상태
  const [attendanceStatus, setAttendanceStatus] = useState('');

  // 현재 선택된 반 상태
  const [selectedClass, setSelectedClass] = useState('');

  // 원생 정보 조회
  const userData = useSelector((state) => state.user);
    console.log('USER : ', userData);
    console.log('USER BNO : ', userData.bno);
  const fetchChildren = async () => {
    try {
      const response = await axios.get(`/api/children/${userData.bno}`);
      setChildren(response.data);
    } catch (error) {
      console.error('Error fetching children data:', error);
    }
  };

  // 출석 목록 조회
  const fetchAttendanceList = async (date) => {
    try {
      const response = await axios.get(`/api/attendance/${date}`);
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // 출석 기록 함수
  const recordAttendance = async () => {
    if (!selectedChildId || !attendanceStatus) {
      alert('원생과 출석 상태를 선택해주세요.');
      return;
    }

    const date = new Date().toISOString().split('T')[0]; // 현재 날짜
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });

    try {
      await axios.post('/api/attendance', {
        childId: selectedChildId,
        date,
        status: attendanceStatus,
        time,
      });
      alert('출석 정보가 성공적으로 기록되었습니다.');
      // 출석 정보를 다시 불러오거나 다른 필요한 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('Error recording attendance:', error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 원생 정보를 불러옵니다.
  useEffect(() => {
    fetchChildren();
  }, []);

  // 선택한 원생의 출석 목록을 조회합니다.
  useEffect(() => {
    if (selectedChildId) {
      const today = new Date().toISOString().split('T')[0];
      fetchAttendanceList(today);
    }
  }, [selectedChildId]);

  // 선택한 반에 따라 출석 목록을 필터링합니다.
  const filteredAttendanceList = attendanceList.filter(
    (attendance) =>
      selectedClass === '' || attendance.child_class === selectedClass
  );

  return (
    <Paper>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>원생 출석 관리</Typography>

      {/* 반 선택 드롭다운 */}
      <Select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <MenuItem value="">전체 반</MenuItem>
        <MenuItem value="반1">반1</MenuItem>
        <MenuItem value="반2">반2</MenuItem>
        {/* 다른 반들도 추가할 수 있습니다. */}
      </Select>

      {/* 원생 선택 드롭다운 */}
      <select
        onChange={(e) => setSelectedChildId(e.target.value)}
        value={selectedChildId || ''}
      >
        <option value="">원생 선택</option>
        {children.map((child) => (
          <option key={child.child_idx} value={child.child_idx}>
            {child.child_name}
          </option>
        ))}
      </select>

      {/* 출석 상태 선택 드롭다운 */}
      <select
        onChange={(e) => setAttendanceStatus(e.target.value)}
        value={attendanceStatus}
      >
        <option value="">출석 상태 선택</option>
        <option value="출석">출석</option>
        <option value="지각">지각</option>
        <option value="결석">결석</option>
      </select>

      {/* 출석 기록 버튼 */}
      <Button variant="contained" color="primary" onClick={recordAttendance}>
        출석 기록
      </Button>

      {/* 출석 목록 표 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>날짜</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendanceList.map((attendance) => (
              <TableRow key={attendance.id}>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>{attendance.status}</TableCell>
                <TableCell>{attendance.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AttendanceManagement;
