const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');

// 새 게시물 생성 
router.post('/create', async (req, res, next) => {
  // 세션에서 사용자 ID 추출
  const userId = req.session.userId;

  // 사용자 ID가 없는 경우, 로그인이 필요하다는 메시지 응답
  if (!userId) {
    return res.status(401).json({
      status: 'fail',
      message: '로그인이 필요합니다',
    });
  }

  // 데이터베이스에서 사용자 확인
  const userExists = await db.query('SELECT * FROM users WHERE id = ?', [
    userId
  ]);
  if (userExists.length === 0) {
    // 사용자가 존재하지 않는 경우, 사용자를 찾을 수 없다는 메시지 응답
    return res.status(401).json({
      status: 'fail',
      message: '사용자를 찾을 수 없습니다',
    });
  }

  // 데이터베이스에 새 게시물 생성
  const newPost = await db.query(
    'INSERT INTO board (title, content, user_id) VALUES (?, ?, ?)',
    [
      req.body.title,
      req.body.content,
      userId, // 세션에서 가져온 사용자 ID 사용
    ]
  );

  // 성공적인 응답 반환
  res.status(201).json({
    status: 'success',
    data: {
      postId: newPost.insertId,
      message: '게시물이 성공적으로 생성되었습니다',
    },
  });
});

// 모든 게시물 조회 라우터 getPosts
router.get('/', asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  console.log('세션아이디', req.sessionID);

  const [posts] = await db.query(
    'SELECT * FROM board ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, skip]
  );
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
    message: '게시물 목록을 성공적으로 불러왔습니다',
  });
})
);

// 특정 게시물 조회 라우터
router.get('/:id', asyncHandler(async (req, res) => {
  console.log('세션아이디', req.sessionID);
  const [post] = await db.query('SELECT * FROM board WHERE id = ?', [
    req.params.id,
  ]);
  if (post.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: '해당 ID를 가진 게시물을 찾을 수 없습니다',
    });
  }

  await db.query('UPDATE board SET views = views + 1 WHERE id = ?', [
    req.params.id,
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      post: post[0],
    },
    message: '게시물을 성공적으로 불러왔습니다',
  });
}))


// 게시글 수정 라우터
router.put('/update', asyncHandler(async (req, res) => {
  console.log('세션아이디', req.sessionID);
  const [currentUser] = await db.query('SELECT * FROM users WHERE id = ?', [
    req.user.id,
  ]);
  const [post] = await db.query('SELECT * FROM board WHERE id = ?', [
    req.params.id,
  ]);
  if (
    currentUser.length === 0 ||
    post.length === 0 ||
    post[0].user_id !== req.user.id
  ) {
    return res.status(403).json({
      status: 'fail',
      message: '수정 권한이 없습니다',
    });
  }

  await db.query('UPDATE board SET title = ?, content = ? WHERE id = ?', [
    req.body.title,
    req.body.content,
    req.params.id,
  ]);
  res.status(200).json({
    status: 'success',
    message: '게시물이 성공적으로 수정되었습니다',
  });
}));

// 게시글 삭제
router.delete('/delete', asyncHandler(async (req, res) => {
  console.log('세션아이디', req.sessionID);
  const [currentUser] = await db.query('SELECT * FROM users WHERE id = ?', [
    req.user.id,
  ]);
  const [post] = await db.query('SELECT * FROM board WHERE id = ?', [
    req.params.id,
  ]);
  if (
    currentUser.length === 0 ||
    post.length === 0 ||
    post[0].user_id !== req.user.id
  ) {
    return res.status(403).json({
      status: 'fail',
      message: '삭제 권한이 없습니다',
    });
  }

  await db.query('DELETE FROM board WHERE id = ?', [req.params.id]);
  res.status(204).json({
    status: 'success',
    message: '게시물이 성공적으로 삭제되었습니다',
  });
}));

module.exports = router;