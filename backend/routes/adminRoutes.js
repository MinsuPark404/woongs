const express = require('express');
const router = express.Router();
const { businessList, createAdmin, getLoginLogs, loginAdmin, updateAdmin, createBusiness } = require('../controllers/adminController');

// 사업자 등록
router.post('/register', createAdmin);

// 사업자 조회
router.get('/list', businessList);

// 로그인
router.post('/login', loginAdmin);

// 로그인 로그 조회
router.get('/loginLogs', getLoginLogs);

// 관리자 정보 업데이트
router.put('/update/:id', updateAdmin);

// 어린이집 등록
router.post('/businesses', createBusiness);

module.exports = router;
