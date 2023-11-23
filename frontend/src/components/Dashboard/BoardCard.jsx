import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider
} from '@mui/material';

const sampleData = [
  {
    category: '공지',
    title: '공지사항입니다.',
    author: '관리자',
    date: '2023-10-01',
  },
  {
    category: '특이사항',
    title: '홍길동 특이사항 입니다.',
    author: '최종용',
    date: '2023-10-01',
  },
  {
    category: '알람',
    title: '일정입니다.',
    author: '관리자',
    date: '2023-10-01',
  },
  {
    category: '특이사항',
    title: '홍길 특이사항 입니다.',
    author: '최종용',
    date: '2023-10-01',
  },
];

const BoardTable = () => {
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ fontWeight: 'bold', color:"white" }}>말머리</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color:"white" }}>글 제목</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color:"white" }}>작성자</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color:"white" }}>작성일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((data, index) => (
              <TableRow
                key={index}
              >
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.author}</TableCell>
                <TableCell>{data.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
const BoardCard = () => {
  return (
    <>
        <Typography variant="h5" component="h2" gutterBottom>
            최근 게시글
        </Typography>
        <br/>
        <BoardTable />
    </>
  );
};

export default BoardCard;