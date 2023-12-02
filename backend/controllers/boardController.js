const asyncHandler = require('express-async-handler');
const boardModel = require('../models/boardModel');
const db = require('../config/dbConnMysql');

// 게시글 생성
const createBoard = asyncHandler(async (req, res) => {
  const { title, header, content } = req.body;
  const writerName = req.session.admin?.name || req.session.user?.name;
  const writerBno = req.session.admin?.bno || req.session.user?.bno;
  try {
    // 데이터베이스에 새 게시물 생성
    console.log('게시물 작성 정보:', {
      '작성자 이름': writerName,
      '작성자 소속사': writerBno,
      제목: title,
      헤더: header,
      내용: content,
    });
    const result = await boardModel.createPost(
      writerName,
      writerBno,
      header,
      title,
      content
    );
    res.status(201).json({
      status: 'success',
      data: {
        postId: result.insertId,
        message: '게시물이 성공적으로 생성되었습니다',
      },
    });
  } catch (error) {
    // 에러 핸들링
    res.status(500).json({
      status: 'error',
      message: '게시물 생성 중 오류가 발생했습니다',
    });
  }
});

// 전체 게시글 조회
const getPosts = asyncHandler(async (req, res) => {
  console.log('세션 아이디:', req.session.admin);
  const businessBno = req.session.admin.bno;
  console.log(businessBno);
  try {
    const result = await boardModel.getPosts(businessBno);
    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '게시물 조회 중 오류가 발생했습니다',
    });
  }
});

// 특정 게시글 조회
const getPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id);
  // 게시물 ID 유효성 검증
  if (isNaN(postId) || postId < 1) {
    return res.status(400).json({
      status: 'fail',
      message: '유효하지 않은 게시물 ID입니다',
    });
  }
  try {
    // 게시물 조회
    const result = await boardModel.getPost(postId);
    // 게시물 존재 여부 확인
    if (result.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '해당 ID를 가진 게시물을 찾을 수 없습니다',
      });
    }
    // 성공적인 응답 반환
    res.status(200).json({
      status: 'success',
      data: {
        result,
      },
    });
  } catch (error) {
    // 데이터베이스 쿼리 오류 처리
    res.status(500).json({
      status: 'error',
      message: '게시물 조회 중 오류가 발생했습니다',
    });
  }
});

// 게시글 수정
const updatePost = asyncHandler(async (req, res) => {
  const { board_idx } = req.session.admin.bno;
  const { title, content } = req.body;
  const writerName = req.session.admin?.name || req.session.user?.name;
  try {
    // 게시글의 작성자 정보를 확인
    const checkResult = await boardModel.sqlCheck(board_idx);
    if (checkResult.length === 0) {
      return res.status(404).json('게시글을 찾을 수 없습니다');
    }
    const writer = checkResult[0].writer;
    if (writerName !== writer) {
      return res.status(403).json('수정 권한이 없습니다');
    }
    if (!title || !content) {
      return res.status(400).json('제목, 내용이 없습니다');
    }
    // 게시글 수정
    const upatePost = await boardModel.updatePost(title, content, board_idx);
    res.status(200).json(upatePost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 게시글 삭제
const deletePost = asyncHandler(async (req, res) => {
  const { board_idx } = req.params;
  const writerName = req.session.admin?.name || req.session.user?.name;
  try {
    // 게시글의 작성자 정보를 확인
    const checkResult = await boardModel.sqlCheck(board_idx);
    if (checkResult.length === 0) {
      return res.status(404).json('게시글을 찾을 수 없습니다.');
    }
    const writer = checkResult[0].writer;
    if (writerName !== writer) {
      return res.status(403).json('삭제 권한이 없습니다.');
    }
    // 게시글 삭제
    const deletePost = boardModel.deletePost(board_idx);
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = {
  createBoard,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
