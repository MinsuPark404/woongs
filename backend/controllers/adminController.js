const adminModel = require('../models/adminModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../config/dbConnMysql');

// @관리자 등록
// @Endpoint POST /api/admins/register
// @access admin_s
const createAdmin = asyncHandler(async (req, res) => {
  try {
    const adminData = req.body;
    // 이메일 중복 체크
    const existingAdminEmail = await adminModel.findAdminByEmail(adminData.admin_email);
    if (existingAdminEmail.length > 0) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }
    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(adminData.admin_password, saltRounds);
    adminData.admin_password = hashedPassword; // 해시된 비밀번호로 대체
    // 관리자 데이터 추가
    const newAdmin = await adminModel.createAdmin(adminData);
    return res.status(201).json({
      message: '관리자가 성공적으로 생성되었습니다.',
      adminId: newAdmin.insertId,
    });
  } catch (error) {
    // 에러 로깅
    console.error('Admin creation failed:', error);
    return res.status(500).json({ message: '관리자 생성 중 오류가 발생했습니다.' });
  }
});

// @관리자 로그인
// @Endpoint POST /api/admins/login
// @access admin_s, admin_c
const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;

    // 이메일로 관리자 찾기
    const adminData = await adminModel.findAdminByEmail(admin_email);
    const admin = adminData.length > 0 ? adminData[0] : null;

    // 관리자가 존재하지 않거나, 비밀번호가 맞지 않으면 오류 메시지 전송
    if (!admin) {
      return res.status(401).json({ message: '인증 정보가 잘못되었습니다.' });
    }

    // bcrypt.compare로 입력된 비밀번호와 해시된 비밀번호 비교
    const passwordMatch = await bcrypt.compare(admin_password, admin.admin_password);

    // 비밀번호가 일치하면 로그인 성공 처리
    if (passwordMatch) {
      // 토큰 발급 등의 로그인 성공 처리 로직을 여기에 작성합니다.
      // 예: JWT 토큰 발급
      return res.status(200).json({
        message: '로그인 성공!',
        // 토큰과 관리자 정보 전송 (중요 정보는 제외하고 전송)
      });
    } else {
      // 비밀번호 불일치
      return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
    }
  } catch (error) {
    // 에러 로깅
    console.error('Admin login failed:', error);
    return res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

// @관리자 목록 조회
// @Endpoint POST /api/admins/list
// @access admin_s
const businessList = asyncHandler(async (req, res) => {
  const [admins] = await db.query('SELECT * FROM cms_admins');
  res.status(200).json(admins);
});

// @관리자 정보 업데이트
// @Endpoint PUT /api/admins/:id
// @access admin_s
const updateAdmin = asyncHandler(async (req, res) => {
  const adminId = req.params.id; // URL 경로에서 관리자 ID 추출
  const adminData = req.body; // 요청 본문에서 관리자 데이터 추출

  try {
    // ISO 8601 형식을 MySQL dateTime 형식으로 변환
    if (adminData.created_at) {
      adminData.created_at = adminData.created_at.replace('T', ' ').slice(0, 19);
    }
    if (adminData.updated_at) {
      adminData.updated_at = adminData.updated_at.replace('T', ' ').slice(0, 19);
    }

    // 관리자 데이터를 업데이트하는 모델 함수를 호출
    const result = await adminModel.updateAdminData(adminId, adminData);
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: '관리자 정보가 업데이트되었습니다.',
        adminId: adminId,
      });
    } else {
      res.status(404).json({
        message: '업데이트할 관리자를 찾을 수 없습니다.',
      });
    }
  } catch (err) {
    console.error(err);
    let errorMessage = '관리자 정보 업데이트 중 문제가 발생했습니다.';
    // 다양한 에러 타입에 따라 처리
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      errorMessage = '이 관리자는 현재 다른 데이터와 연관되어 있어서 업데이트할 수 없습니다.';
    }
    res.status(500).json({
      message: errorMessage,
      error: err.code,
    });
  }
});

// @로그인 로그 조회
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

// @어린이집 등록
// @Endpoint POST /api/admins/businesses
// @access admin_s
const createBusiness = asyncHandler(async (req, res) => {
  try {
    const businessData = req.body;
    console.log(businessData);
    const createdBusiness = await adminModel.createBusiness(businessData);
    return res.status(201).json({
      message: '사업체 생성 성공',
      business: createdBusiness,
    });
  } catch (error) {
    console.error('사업체 생성 실패', error);
    return res.status(500).json({ message: '사업체 생성 중 오류가 발생했습니다.' });
  }
});

module.exports = {
  businessList,
  createAdmin,
  loginAdmin,
  getLoginLogs,
  updateAdmin,
  createBusiness,
};
