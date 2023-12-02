const express = require('express');
const router = express.Router();
const {
  getDomain,
  createDomain,
  updateDomain,
} = require('../controllers/domainController');

// 전체 도메인 정보 조회 라우트
router.get('/', getDomain);

// 도메인 등록
router.post('/register', createDomain);

// 도메인 수정
router.put('/:id', updateDomain);

module.exports = router;
