// 사용자 관련 API
const express = require('express');
const router = express.Router();
const {
  businessList,
  createAdmin,
  getLoginLogs,
  loginAdmin,
} = require('../../controllers/adminController');

// 사업자 등록
router.route('/register').post(createAdmin);

// 사업자 조회
router.route('/list').get(businessList);

// 로그인
router.route('/login').post(loginAdmin);

// 로그인 조회
router.route('/loginLogs').get(getLoginLogs);

module.exports = router;
