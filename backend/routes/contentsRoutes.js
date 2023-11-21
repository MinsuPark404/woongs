const express = require('express');
const router = express.Router();
const { 
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/contentsController');

// 사용자별맞춤형 등록
//TODO 미완성, 수정해야함
router.post('/:id', createContent);

// 사용자별맞춤형 수정
//TODO 미완성, 수정해야함
router.put('/:id', updateContent);

// 사용자별맞춤형 삭제
//TODO 미완성, 수정해야함
router.delete('/:id', deleteContent);

module.exports = router;
