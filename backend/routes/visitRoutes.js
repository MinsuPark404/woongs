const express = require('express');
const router = express.Router();
const { getVisitsByDate } = require('../controllers/visitsContoller');

// 현재 월과 일의 방문자 수를 조회하는 라우터
router.get('/current', getVisitsByDate);

module.exports = router;
