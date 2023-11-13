const express = require('express');
const router = express.Router();
const { createBusiness } = require('../controllers/businessController');

// 어린이집 등록
router.post('/', createBusiness);

// 어린이집 목록
router.get('/');

// 어린이집 수정
router.put('/');

// 어린이집 삭제
router.delete('/');

module.exports = router;
