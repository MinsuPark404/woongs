import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // API 호출을 위해 axios 사용
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
    const bno = '916-23-31691'

// {    board_created_at: "2023-04-21T19:27:49.000Z"
//     board_idx: 1
//     board_updated_at: "2023-12-26T09:42:04.000Z"
//     business_bno: "916-23-31691"
//     content: "어린이집 소식 업데이트 내용"
//     header: "공지사항"
//     title: "어린이집 졸업식 일정 안내"}

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/boards/list/${bno}`);
        console.log(response.data);
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (!posts) return null;
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        게시글 목록
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>말머리</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell align="right">작성일자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.header}
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell align="right">{post.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default BoardList;
