const express = require('express');
const router = express.Router();
const { getDetect } = require('../controllers/detectController');

// 탐지 조회 라우터
router.get('/', getDetect);

module.exports = router;
