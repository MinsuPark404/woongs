const db = require('../config/dbConnMysql');
const { boardQueries } = require('./_Queries');

const createPost = async (title, content, userId) => {
  try {
    const results = await db.query(boardQueries.createPost, [title, content, userId]);
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllPosts = async (business_bno) => {
  try {
    const results = await db.query(boardQueries.getPosts, [business_bno]);
    return results;
  } catch (err) {
    throw err;
  }
};

const getPostById = async (postId) => {
  try {
    const results = await db.query(boardQueries.getPost, [postId]);
    return results;
  } catch (err) {
    throw err;
  }
};

const updatePost = async (postId, title, content, userId) => {
  try {
    const results = await db.query(boardQueries.updatePost, [title, content, userId, postId]);
    return results;
  } catch (err) {
    throw err;
  }
};

const deletePost = async (postId) => {
  try {
    const results = await db.query(boardQueries.deletePost, [postId]);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
