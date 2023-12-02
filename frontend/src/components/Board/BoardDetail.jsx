import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { Container, Typography, Paper, Box, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const BoardDetail = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    console.log(id);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/boards/detail/${id}`);
        console.log(response);
        console.log(response.data.data.post);
        console.log(response.data.data.post[0]);
        setPost(response.data.data.post[0]);
      } catch (error) {
        console.error('Error fetching post details', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>{post.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{post.header} - {post.author}</Typography>
        <Typography variant="subtitle2" gutterBottom>{new Date(post.board_created_at).toLocaleDateString('ko-KR')}</Typography>
        <Box sx={{ marginTop: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Box>
        <Grid container justifyContent="flex-end">
            <Grid item>
                  <Link to="/main/board" style={{textDecoration : 'none', color : 'inherit'}}>
                <Button variant="contained" color="secondary" >
                목록으로
                </Button>
                </Link>
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BoardDetail;
