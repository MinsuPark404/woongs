import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import axios from '../../axios';
const sampleData = [
  {
    header: '공지',
    title: '공지사항입니다.',
    writer: '관리자',
    board_created_at: '2023-10-01',
  },
  {
    header: '특이사항',
    title: '홍길동 특이사항 입니다.',
    writer: '최종용',
    board_created_at: '2023-10-01',
  },
  {
    header: '알람',
    title: '일정입니다.',
    writer: '관리자',
    board_created_at: '2023-10-01',
  },
  {
    header: '특이사항',
    title: '홍길 특이사항 입니다.',
    writer: '최종용',
    board_created_at: '2023-10-01',
  },
];

const BoardTable = () => {
  const [writeData, setWriteData] = React.useState(sampleData);
  const bno = useSelector((state) => state.user.bno);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/boards/list/${bno}`);
        console.log("게시글조회 데이터들", response.data);
        //  데이터갯수 4개로 제한 (최신글 4개만 보여주기) 마지막 4개만 보여주기
        const data = response.data.data.posts.slice(4);
        setWriteData(data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

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
            {writeData.map((data, index) => (
              <TableRow
                key={index}
              >
                <TableCell>{data.header}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.writer}</TableCell>
                <TableCell>{formatDate(data.board_created_at)}</TableCell>
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