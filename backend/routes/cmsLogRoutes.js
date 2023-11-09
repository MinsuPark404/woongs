const express = require('express');
const router = express.Router();
const {
  createLoginLog,
  LoginLogList,
  LoginLogListAll,
} = require('../controllers/cmsLogController');

// 로그인 정보 추가
router.post('/register', createLoginLog);

// 특정 로그인 정보 조회
router.get('/:id', LoginLogList);

// 모든 로그인 정보 조회
router.get('/', LoginLogListAll);
