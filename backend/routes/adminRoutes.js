const express = require('express');
const router = express.Router();
const { businessList, createAdmin, loginAdmin, updateAdmin, adminLogs, logoutAdmin, getSessionData } = require('../controllers/adminController');

// 사업자 등록
router.post('/register', createAdmin);

// 사업자 조회
router.get('/list', businessList);

// 로그인
router.post('/login', loginAdmin);

// 관리자 정보 업데이트
router.put('/update/:id', updateAdmin);

// 로그아웃
router.post('/logout', logoutAdmin);

// 관리자 로그 조회
router.get('/logs', adminLogs);

// 세션 데이터 조회
router.post('/sessiondata', getSessionData);

module.exports = router;
