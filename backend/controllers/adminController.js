/* 관리자 계정 관리: 조회, 등록, 업데이트, 삭제, 로그 관리 */

const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');

// @desc 모든 관리자 조회
// @Endpoint GET /api/admins
// @access superAdmin
const getAdmins = asyncHandler(async (req, res) => {
  const sql = 'SELECT * FROM admins';
  db.query(sql, (err, results) => {
    if (err) {
      // 에러를 next 함수에 전달ㄴ
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
// @Endpoint POST /api/admins/register
// @access superAdmin
const createAdmin = asyncHandler(async (req, res) => {
  const {
    admin_name,
    admin_password,
    company_name,
    company_address,
    company_unique,
    admin_email,
    admin_phone,
    admin_phone2,
    role,
    is_active,
  } = req.body;
  const sql = `INSERT INTO admins (
    admin_name, 
    admin_password, 
    company_name, 
    company_address, 
    company_unique, 
    admin_email, 
    admin_phone, 
    admin_phone2, 
    role, 
    is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      admin_name,
      admin_password,
      company_name,
      company_address,
      company_unique,
      admin_email,
      admin_phone,
      admin_phone2,
      role,
      is_active,
    ],
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
// @Endpoint GET /api/admins/:adminId
// @access superAdmin
const getAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const sql = 'SELECT * FROM admins WHERE company_unique = ?';
  db.query(sql, [adminId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server Error', err });
    if (results.length === 0)
      return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: `사용자 조회`, firstResults: results[0] });
  });
});

// @desc 특정 관리자의 권한 변경
// @Endpoint put /api/admins/:adminId/role
// @access superAdmin
const patchAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자의 권한 변경` });
});

// @desc 특정 관리자 삭제
// @Endpoint GET /api/admins/:adminId
// @access superAdmin
const deleteAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `사용자 삭제 (계정 비활성화)` });
});

// @desc 로그인 기능
// @Endpoint POST /api/login
// @access admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { admin_email, admin_password } = req.body;
  try {
    // MySQL에서 이메일로 관리자 정보 조회
    const connection = await db.getConnection();
    const [results] = await connection.query(
      'SELECT * FROM admins WHERE admin_email = ?',
      [admin_email]
    );
    connection.release();

    // 관리자가 존재하지 않는 경우
    if (results.length === 0) {
      return res.status(401).json({ message: '일치하는 관리자가 없습니다.' });
    }

    // 비밀번호 비교
    const admin = results[0];
    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isMatch) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // 로그인 성공
    return res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류' });
  }
});

// @desc 로그인 로그 조회
// @Endpoint GET /api/login-logs
// @access superAdmin
const getLoginLogs = asyncHandler(async (req, res, next) => {
  const sql = 'SELECT * FROM login_logs ORDER BY login_time DESC';
  db.query(sql, (err, results) => {
    if (err) {
      // 에러를 next 함수에 전달
      return next(err);
    }
    if (results.length === 0) {
      // 로그인 로그가 없을 경우 오류를 생성하여 next 함수에 전달
      const error = new Error('No login logs found');
      res.statusCode = 404; // 상태 코드를 404로 설정
      return next(error);
    }
    // 로그인 로그를 JSON 형태로 응답
    res.status(200).json({ message: '로그인 로그 조회', results });
  });
});

module.exports = {
  createAdmin,
  getAdmins,
  getAdmin,
  patchAdmin,
  deleteAdmin,
  loginAdmin,
  getLoginLogs,
};
