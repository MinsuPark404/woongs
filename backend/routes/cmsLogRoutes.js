const express = require('express');
const router = express.Router();
const {
  LoginLogList,
  LoginLogListAll,
} = require('../controllers/cmsLogController');

// 특정 로그인 정보 조회
// router.get('/:id', LoginLogList);

// 모든 로그인 정보 조회
// router.get('/', LoginLogListAll);

//TODO : 나중에 구상
