const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');

// @desc 모든 관리자 조회
// Endpoint GET /api/admins
// @access admin
const getAdmins = asyncHandler(async (req, res) => {
  const sql = 'SELECT * FROM admins';
  db.query(sql, (err, results) => {
    if (err) {
      // 에러를 next 함수에 전달
      return next(err);
    }
    if (results.length === 0) {
      // 에러를 생성하여 next 함수에 전달
      const error = new Error('No users found');
      res.statusCode = constants.NOT_FOUND;
      return next(error);
    }
    res.status(200).json({ message: '모든 사용자 조회', results });
  });
});

// @desc 관리자 등록
// Endpoint POST /api/admins/register
// @access admin
const createAdmin = asyncHandler(async (req, res) => {
  const { admin_name, admin_password, admin_email, admin_phone, role } =
    req.body;
  const sql =
    'INSERT INTO admins (admin_name, admin_password, admin_email, admin_phone, role) VALUES (?, ?, ?, ?, ?)';
  db.query(
    sql,
    [admin_name, admin_password, admin_email, admin_phone, role],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server Error', err });
      res.status(201).json({
        message: 'Admin created successfully',
        adminId: results.insertId,
      });
    }
  );
});

// @desc 특정 관리자 조회
// Endpoint GET /api/admins/:adminId
// @access admin
const getAmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자 조회` });
});

const getAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const sql = 'SELECT * FROM admins WHERE admin_id = ?';
  db.query(sql, [adminId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error', err });
    if (results.length === 0)
      return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: `사용자 조회`, firstResults: results[0] });
  });
});

// @desc 특정 관리자의 권한 변경
// Endpoint GET /api/admins/:adminId/role
// @access admin
const patchAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자의 권한 변경` });
});

// @desc 특정 관리자 삭제
// Endpoint GET /api/admins/:adminId
// @access admin
const deleteAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자 삭제 (계정 비활성화)` });
});

module.exports = { createAdmin, getAdmins, getAmin, patchAdmin, deleteAdmin };
