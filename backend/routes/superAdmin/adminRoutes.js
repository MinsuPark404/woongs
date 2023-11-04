// 사용자 관련 API
const express = require('express');
const router = express.Router();
const {
  getAdmins,
  getAdmin,
  patchAdmin,
  deleteAdmin,
  createAdmin,
  getLoginLogs,
  loginAdmin,
} = require('../../controllers/adminController');

const connectDb = require('../../config/dbConnMysql');

// 사업자 등록
router.route('/register').post(createAdmin);

// 모든 사용자 조회
router.route('/').get(getAdmins);

// 특정 사용자 조회
router.route('/:adminId').get(getAdmin);

// 특정 사용자의 권한 변경
router.route('/:adminId/role').patch(patchAdmin);

// 특정 사용자 삭제
router.route('/:adminId').delete(deleteAdmin);

// 로그인
router.route('/login').post(loginAdmin);

// 로그인 조회
router.route('/loginLogs').get(getLoginLogs);

module.exports = router;
