import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  TablePagination, Container, Button, TextField, FormControl, Select, InputLabel, MenuItem, Grid
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterHeader, setFilterHeader] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
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
    // 말머리 변경 핸들러
    const handleFilterHeaderChange = (event) => {
        setFilterHeader(event.target.value);
    };
    
      // 제목 검색 핸들러
      const handleSearchTitleChange = (event) => {
        setSearchTitle(event.target.value);
    };
    const getFilteredPosts = () => {
        return posts.filter(post => {
          // 말머리 필터링
          if (filterHeader && post.header !== filterHeader) {
            return false;
          }
          // 제목 검색 필터링
          if (searchTitle && !post.title.toLowerCase().includes(searchTitle.toLowerCase())) {
            return false;
          }
          return true;
        });
      };

      const filteredPosts = getFilteredPosts();


  if (!posts) return null;
  return (
    <Container maxWidth="lg">
    <Paper sx={{width : '100%', padding : 4}}>
    <TableContainer component={Paper} sx={{ width : '100%', marginTop: 4 }}>
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
          {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
            <TableRow
              key={index}
              sx={{ 
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.07)', 
                },
                cursor: 'pointer'
              }}
              onClick={() => window.location.href=`/main/board-detail/${post.board_idx}`}
            >
              <TableCell component="th" scope="row">
                {post.header}
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.writer}</TableCell>
              <TableCell align="right">{formatDate(post.board_created_at)}</TableCell>
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
    <br />
    <Grid container spacing={0} sx={{ marginBottom: 2 }}>
        <Grid item xs={3}>
          <Button variant="outlined" color="primary" href='/main/write' size="large">
            글쓰기
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="filter-header-label">말머리</InputLabel>
            <Select
              labelId="filter-header-label"
              value={filterHeader}
              label="말머리"
              onChange={handleFilterHeaderChange}
            >
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="공지사랑">공지사항</MenuItem>
              <MenuItem value="특이사항">특이사항</MenuItem>
              <MenuItem value="일반">일반</MenuItem>
              <MenuItem value="알람">알람</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="제목 검색"
            value={searchTitle}
            onChange={handleSearchTitleChange}
          />
        </Grid>
      </Grid>
    </Paper>
    </Container>
  );
};

export default BoardList;
