const express = require('express');
const router = express.Router();
const {
  businessList,
  createAdmin,
  getLoginLogs,
  loginAdmin,
  updateAdmin, // Import the updateAdmin function
} = require('../../controllers/adminController');

// 사업자 등록
router.post('/register', createAdmin);

// 사업자 조회
router.get('/list', businessList);

// 로그인
router.post('/login', loginAdmin);

// 로그인 로그 조회
router.get('/loginLogs', getLoginLogs);

// 관리자 정보 업데이트 (assuming that the update is based on admin's ID)
// Make sure to secure this route as necessary, e.g., with authentication middleware
router.put('/update/:id', updateAdmin);

module.exports = router;
