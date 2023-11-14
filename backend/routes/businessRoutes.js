const express = require('express');
const router = express.Router();
const {
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require('../controllers/businessController');

// 어린이집 등록
router.post('/', createBusiness);

// 어린이집 수정
router.put('/:id', updateBusiness);

// 어린이집 삭제
router.delete('/:id', deleteBusiness);

module.exports = router;
