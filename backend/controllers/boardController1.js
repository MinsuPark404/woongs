const asyncHandler = require('express-async-handler');
const boardModel = require('../models/boardModel');

const createBoard = asyncHandler(async (req, res) => {
  try {
    const userId = req.session.admin.id; // 세션에서 사용자 ID 추출
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ status: 'fail', message: '제목과 내용은 필수입니다' });
    }

    const result = await boardModel.createPost(title, content, userId);
    res.status(201).json({ status: 'success', data: { post: result } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  console.log('게시글')
  try {
    const business_bno = req.params.business_bno;
    const posts = await boardModel.getAllPosts(business_bno);
    res.status(200).json({ status: 'success', data: { posts } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const getPost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await boardModel.getPostById(postId);

    if (post.length === 0) {
      return res.status(404).json({ status: 'fail', message: '게시물을 찾을 수 없습니다' });
    }

    res.status(200).json({ status: 'success', data: { post } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.admin.id;
    const { title, content } = req.body;

    await boardModel.updatePost(postId, title, content, userId);
    res.status(200).json({ status: 'success', message: '게시물이 성공적으로 수정되었습니다' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    await boardModel.deletePost(postId);
    res.status(200).json({ status: 'success', message: '게시물이 성공적으로 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = {
  createBoard,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
