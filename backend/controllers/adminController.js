const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');
// @desc 모든 사용자 조회
// Endpoint GET /api/admins/users
// @access admin
const getAdmins = asyncHandler(async (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      // 에러를 next 함수에 전달
      return next(err);
    }
    if (result.length === 0) {
      // 에러를 생성하여 next 함수에 전달
      const error = new Error('No users found');
      res.statusCode = constants.NOT_FOUND;
      return next(error);
    }
    res.status(200).json({ message: '모든 사용자 조회', result });
  });
});

// @desc 특정 사용자 조회
// Endpoint GET /api/admins/users/:userId
// @access admin
const getAmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자 조회` });
});

// @desc 특정 사용자의 권한 변경
// Endpoint GET /api/admins/users/:userId/role
// @access admin
const patchAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자의 권한 변경` });
});

// @desc 특정 사용자 삭제
// Endpoint GET /api/admins/users/:userId
// @access admin
const deleteAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자 삭제 (계정 비활성화)` });
});

module.exports = { getAdmins, getAmin, patchAdmin, deleteAdmin };
