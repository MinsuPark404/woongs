/* 관리자 계정 관리: 조회, 등록, 업데이트, 삭제, 로그 관리 */

const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');





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
  try {
    const results = await db.query(sql, [
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
    ]);
    res.status(201).json({
      
      message: '관리자가 성공적으로 생성되었습니다.',
      adminId: results[0].insertId,
    });
  } catch (err) {
    console.error(err); // 에러 로깅
    // 에러 유형에 따라 다른 메시지를 설정할 수 있습니다.
    let errorMessage =
      '관리자 생성 중 문제가 발생했습니다. 나중에 다시 시도해 주세요.';
    if (err.code === 'ER_DUP_ENTRY') {
      errorMessage = '이미 존재하는 관리자입니다.';
    } else if (err.code === 'ER_BAD_NULL_ERROR') {
      errorMessage = '필수 정보가 누락되었습니다.';
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      errorMessage = '데이터베이스 접근 권한이 거부되었습니다.';
    }
    res.status(500).json({
      message: errorMessage,
      error: err.code, // 에러 코드 추가 (옵션)
    });
  }
});


const loginAdmin = asyncHandler(async (req, res) => {
  const { admin_email, admin_password } = req.body;
  try {
    // Connect to MySQL and retrieve admin information by email
    const connection = await db.getConnection();
    const [results] = await connection.query(
      'SELECT * FROM admins WHERE admin_email = ?',
      [admin_email]
    );
    connection.release();

    // Check if the admin exists
    if (results.length === 0) {
      cons
      return res.status(401).json({ message: '일치하는 관리자가 없습니다.' });
    }
    console.log(results[0])

    const admin = results[0];

    // Compare passwords (assuming passwords are stored in plain text, which is not recommended)
    if (admin_password === admin.admin_password) {
      // Passwords match
      return res.status(200).json({ message: '로그인 성공', admin });
    } else {
      // Passwords do not match
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류' });
  }
});



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
  
  loginAdmin,
  getLoginLogs,
};
