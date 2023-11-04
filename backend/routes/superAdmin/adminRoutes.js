// 사용자 관련 API
const express = require('express');
const router = express.Router();
const {
 
  createAdmin,
  getLoginLogs,
  loginAdmin,
} = require('../../controllers/adminController');

const connectDb = require('../../config/dbConnMysql');

// 사업자 등록
router.route('/register').post(createAdmin);


// 로그인
router.route('/login').post(loginAdmin);

// 로그인 조회
router.route('/loginLogs').get(getLoginLogs);

module.exports = router;
