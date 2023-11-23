const express = require('express');
const router = express.Router();
const { getVisitsByDate, getDomainVisitsByDate } = require('../controllers/visitsContoller');

// 현재 월과 일의 방문자 수를 조회하는 라우터
router.get('/', getVisitsByDate);

router.get('/domain', getDomainVisitsByDate);

module.exports = router;
