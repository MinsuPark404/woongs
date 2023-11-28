const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');

// 새 게시물 생성
router.post('/create', asyncHandler( async (req, res) => {
  try {
    const userId = req.session.admin.id; 
    const userRole = req.session.admin.role; 
    const userBno = req.session.admin.bno;
    if (!userId) {
      return res.status(401).json({
        status: 'fail',
        message: '로그인이 필요합니다',
      });
    }
    let userExists;
    // 관리자 여부에 따라 적절한 테이블에서 사용자 정보 조회
    if (userRole === '관리자') {
      userExists = await db.query(
        `SELECT * FROM cms_admins WHERE admin_idx = ? AND business_bno = ?`,
        [userId, userBno]
      );
    } else {
      userExists = await db.query(
        `SELECT * FROM cms_users WHERE user_idx = ? AND business_bno = ?`,
        [userId, userBno]
      );
    }

    // 사용자 존재 여부 확인
    if (userExists.length === 0) {
      // 사용자가 존재하지 않는 경우, 사용자를 찾을 수 없다는 메시지 응답
      return res.status(401).json({
        status: 'fail',
        message: '사용자를 찾을 수 없습니다',
      });
    }

    // 입력 데이터 검증
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: 'fail',
        message: '제목과 내용은 필수입니다',
      });
    }

    // 데이터베이스에 새 게시물 생성
    const newPost = await db.query(
      `INSERT INTO board (title, content, user_id) VALUES (?, ?, ?)`,
      [req.body.title, req.body.content, userId]
    );

    // 성공적인 응답 반환
    res.status(201).json({
      status: 'success',
      data: {
        postId: newPost.insertId,
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
}));

// 모든 게시물 조회 라우터 getPosts
router.get('/list/:bno',asyncHandler(async (req, res) => {
  console.log("세션 아이디:", req.session.admin)
  const bno = req.params.bno;
  console.log(bno);
  const sql = `SELECT * FROM board WHERE business_bno = ?`;
  try {
    const [posts] = await db.query(sql, [bno]);
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '게시물 조회 중 오류가 발생했습니다',
    });
  }
  })
);

// 특정 게시물 조회 라우터
router.get('/detail/:id', asyncHandler(async (req, res) => {
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
    const [post] = await db.query(`SELECT * FROM board WHERE board_idx = ?`, [postId,]);
    // 게시물 존재 여부 확인
    if (post.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '해당 ID를 가진 게시물을 찾을 수 없습니다',
      });
    }
    // 성공적인 응답 반환
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    // 데이터베이스 쿼리 오류 처리
    res.status(500).json({
      status: 'error',
      message: '게시물 조회 중 오류가 발생했습니다',
    });
  }
}));
// 게시글 수정 라우터
router.put(
  '/update/:id',
  asyncHandler(async (req, res) => {
    const userId = req.session.admin.id; 
    const userRole = req.session.admin.role;
    const userBno = req.session.admin.bno; 
    const postId = parseInt(req.params.id);

    // ID 값 및 입력 데이터 유효성 검증
    if (isNaN(postId) || postId < 1) {
      return res.status(400).json({
        status: 'fail',
        message: '유효하지 않은 게시물 ID입니다',
      });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: 'fail',
        message: '제목과 내용은 필수입니다',
      });
    }

    try {
      // 현재 사용자의 정보와 게시물 정보를 데이터베이스에서 조회
      const [currentUser] = await db.query(
        `SELECT * FROM users WHERE id = ? AND business_bno = ?`,
        [userId, userBno]
      );
      const [post] = await db.query(`SELECT * FROM board WHERE id = ?`, [
        postId,
      ]);

      // 사용자 존재 여부, 게시물 존재 여부 및 권한 검증
      if (
        currentUser.length === 0 ||
        post.length === 0 ||
        post[0].user_id !== userId ||
        (userRole !== '관리자' && post[0].business_bno !== userBno)
      ) {
        return res.status(403).json({
          status: 'fail',
          message: '수정 권한이 없습니다',
        });
      }

      // 게시물 수정
      await db.query(`UPDATE board SET title = ?, content = ? WHERE id = ?`, [
        req.body.title,
        req.body.content,
        postId,
      ]);

      // 성공적인 응답 반환
      res.status(200).json({
        status: 'success',
        message: '게시물이 성공적으로 수정되었습니다',
      });
    } catch (error) {
      // 데이터베이스 쿼리 오류 처리
      res.status(500).json({
        status: 'error',
        message: '게시물 수정 중 오류가 발생했습니다',
      });
    }
  })
);

router.delete(
  '/delete/:id',
  asyncHandler(async (req, res) => {
    const userId = req.session.admin.id;
    const userRole = req.session.admin.role;
    const userBno = req.session.admin.bno;
    const postId = parseInt(req.params.id);

    // 게시물 ID 유효성 검증
    if (isNaN(postId) || postId < 1) {
      return res.status(400).json({
        status: 'fail',
        message: '유효하지 않은 게시물 ID입니다',
      });
    }

    try {
      let currentUser;

      // 사용자 역할에 따라 적절한 테이블에서 사용자 정보 조회
      if (userRole === '관리자') {
        [currentUser] = await db.query(
          `SELECT * FROM cms_admins WHERE admin_idx = ? AND business_bno = ?`,
          [userId, userBno]
        );
      } else {
        [currentUser] = await db.query(
          `SELECT * FROM cms_users WHERE user_idx = ? AND business_bno = ?`,
          [userId, userBno]
        );
      }

      // 게시물 존재 여부 및 권한 검증
      const [post] = await db.query(`SELECT * FROM board WHERE id = ?`, [
        postId,
      ]);
      if (post.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: '해당 ID를 가진 게시물을 찾을 수 없습니다',
        });
      }

      if (post[0].user_id !== userId && userRole !== '관리자') {
        return res.status(403).json({
          status: 'fail',
          message: '삭제 권한이 없습니다',
        });
      }

      // 게시물 삭제
      await db.query(`DELETE FROM board WHERE id = ?`, [postId]);

      // 성공적인 응답 반환
      res.status(200).json({
        status: 'success',
        message: '게시물이 성공적으로 삭제되었습니다',
      });
    } catch (error) {
      // 데이터베이스 쿼리 오류 처리
      res.status(500).json({
        status: 'error',
        message: '게시물 삭제 중 오류가 발생했습니다',
      });
    }
  })
);

module.exports = router;
