const db = require('../config/dbConnMysql');
const { boardQueries } = require('./_Queries');

// 게시글 생성
const createPost = async (writerName, writerBno, header, title, content) => {
  try {
    const results = await db.query(boardQueries.createPost, [
      writerName,
      writerBno,
      header,
      title,
      content,
    ]);
    return results;
  } catch (err) {
    throw err;
  }
};

// 전체 게시글 조회
const getPosts = async (business_bno) => {
  try {
    const [results] = await db.query(boardQueries.getPosts, [business_bno]);
    return results;
  } catch (err) {
    throw err;
  }
};

// 특정 게시글 조회
const getPost = async (postId) => {
  try {
    const [results] = await db.query(boardQueries.getPost, [postId]);
    return results;
  } catch (err) {
    throw err;
  }
};

// 게시글 수정
const sqlCheck = async (board_idx) => {
  try {
    const [results] = await db.query(boardQueries.sqlCheck, [board_idx]);
    return results;
  } catch (err) {
    throw err;
  }
};

const updatePost = async (title, content, board_idx) => {
  try {
    const [results] = await db.query(boardQueries.updatePost, [
      title,
      content,
      board_idx,
    ]);
    return results;
  } catch (err) {
    throw err;
  }
};

// 게시글 삭제
const deletePost = async () => {
  try {
    const [results] = await db.query(boardQueries.deletePost);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  sqlCheck,
  updatePost,
  deletePost,
};
