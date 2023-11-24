const express = require('express');
const router = express.Router();
const {
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/contentsController');

// 컨텐츠 생성
router.post('/', createContent);

// 컨텐츠 업데이트
router.put('/:contentId', updateContent);

// 컨텐츠 삭제
router.delete('/:contentId', deleteContent);

module.exports = router;
