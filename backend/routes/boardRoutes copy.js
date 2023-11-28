const express = require('express');
const router = express.Router();
const { createBoard, getPosts, getPost, updatePost, deletePost } = require('../controllers/boardController');

// 새 게시물 생성
router.post('/create', createBoard);

// 모든 게시물 조회 라우터 getPosts
router.get('/list/:bno', getPosts);

// 특정 게시물 조회 라우터
router.get('/detail/:id', getPost);

// 게시글 수정 라우터
router.put('/update/:id', updatePost);

// 게시글 삭제 라우터
router.delete('/delete/:id', deletePost);

// // 댓글 생성
// router.post('/comment/create', createComment);

// // 댓글의 댓글 생성
// router.post('/comment/createchild', createCommentchild);

// // 댓글 조회
// router.get('/comment/list', getComments);

// // 댓글 삭제
// router.delete('/comment/delete', deleteComment);

module.exports = router;
