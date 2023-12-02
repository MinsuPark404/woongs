const express = require('express');
const router = express.Router();
const {
  createBoard,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/boardController');

// 새 게시물 생성
router.post('/create', createBoard);

// 모든 게시물 조회 라우터
router.get('/list/:bno?', getPosts);

// 특정 게시물 조회 라우터
router.get('/detail/:id', getPost);

// 게시글 수정 라우터
router.put('/board/:board_idx', updatePost);

// 게시글 삭제 라우터
router.delete('/board/:board_idx', deletePost);

module.exports = router;
