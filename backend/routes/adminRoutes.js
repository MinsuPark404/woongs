// 사용자 관련 API
const express = require('express');
const router = express.Router();
const {
  getAdmins,
  getAmin,
  patchAdmin,
  deleteAdmin,
} = require('../controllers/adminController');

const connectDb = require('../config/dbConnMysql');

// 모든 사용자 조회
router.route('/').get(getAdmins);

// 특정 사용자 조회
router.route('/:userId').get(getAmin);
// 특정 사용자의 권한 변경
router.route('/:userId/role').patch(patchAdmin);

// 특정 사용자 삭제
router.route('/:userId').delete(deleteAdmin);

module.exports = router;
