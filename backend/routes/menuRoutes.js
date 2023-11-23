const express = require('express');
const router = express.Router();
const {
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/contentsController');

// 메뉴 생성
router.post('/', createMenu);

// 메뉴 업데이트
router.put('/:menuId', updateMenu);

// 메뉴 삭제
router.delete('/:menuId', deleteMenu);

module.exports = router;
