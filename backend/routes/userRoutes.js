const express = require('express');
const router = express.Router();
const {
  create,
  findAll,
  findByUser,
  update,
  remove,
  loginUser,
  findLogs,
  logoutUser
} = require('../controllers/userController');

// 어린이집 교사 등록
router.post('/', create);

// 어린이집 교사 조회
router.get('/', findAll);

// 어린이집 특정 교사 조회
router.get('/:id', findByUser);

// 어린이집 교사 로그인
router.post('/login', loginUser);

// 어린이집 교사 업데이트
router.put('/:id', update);

// 어린이집 교사 로그아웃
router.post('/logout', logoutUser);

// 어린이집 교사 삭제
router.delete('/:id', remove);

// 어린이집 교사 로그
router.get('/logs/:bno', findLogs)

module.exports = router;
