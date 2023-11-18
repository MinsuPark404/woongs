const asyncHandler = require('express-async-handler');
const adminModel = require('../models/adminModel');
const cmsLogModel = require('../models/cmsLogModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// @관리자 등록
// @Endpoint POST /api/admins/register
// @access admin_s
const createAdmin = asyncHandler(async (req, res) => {
  try {
    const adminData = req.body;
    // 이메일 중복 체크
    const existingAdminEmail = await adminModel.findAdminByEmail(
      adminData.admin_email
    );
    if (existingAdminEmail.length > 0) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }
    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(
      adminData.admin_password,
      saltRounds
    );
    adminData.admin_password = hashedPassword; // 해시된 비밀번호로 대체
    // 관리자 데이터 추가
    const newAdmin = await adminModel.createAdmin(adminData);
    return res.status(201).json({
      message: '관리자가 성공적으로 생성되었습니다.',
      adminId: newAdmin.insertId,
    });
  } catch (error) {
    // 에러 로깅
    console.error('관리자 생성 실패:', error);
    return res
      .status(500)
      .json({ message: '관리자 생성 중 오류가 발생했습니다.' });
  }
});

// @관리자 로그인
// @Endpoint POST /api/admins/login
// @access admin_s, admin_c
const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const adminData = await adminModel.findAdminByEmail(admin_email);
    const admin = adminData.length > 0 ? adminData[0] : null;

    if (
      !admin ||
      !(await bcrypt.compare(admin_password, admin.admin_password))
    ) {
      await cmsLogModel.logAuthAttempt(admin, 'F', req.ip, false);
      return res.status(401).json({ message: '인증 정보가 잘못되었습니다.' });
    }
    // 로그인 성공 시, 세션에 사용자 정보 저장
    req.session.admin = {
      id: admin.admin_idx,
      email: admin.admin_email,
      name: admin.admin_name,
      role: admin.admin_role, // 슈퍼관리자 = 'admin_s' 또는 사업자 = 'admin_c'
    };
    console.log('세션 정보', req.session.admin);

    await cmsLogModel.logAuthAttempt(admin, 'T', req.ip, true);

    return res.status(200).json({
      message: '로그인 성공!',
      admin: {
        id: admin.admin_idx,
        email: admin.admin_email,
        name: admin.admin_name,
        role: admin.admin_role,
      },
      cookie: res.getHeader('Set-Cookie'),
    });
  } catch (error) {
    console.error('Admin login failed:', error);
    return res
      .status(500)
      .json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

// @관리자 목록 조회
// @Endpoint POST /api/admins/list
// @access admin_s
const businessList = asyncHandler(async (req, res) => {
  try {
    const admins = await adminModel.getAlladmins();
    console.log('두번쨰:', admins);
    res.status(200).json(admins);
  } catch (error) {
    console.error('관리자 목록 조회 실패', error);
    res
      .status(500)
      .json({ message: '관리자 목록 조회 중 오류가 발생했습니다.' });
  }
});

// @관리자 정보 업데이트
// @Endpoint PUT /api/admins/update/:id
// @access admin_s
const updateAdmin = asyncHandler(async (req, res) => {
  const adminId = req.params.id; // URL 경로에서 관리자 ID 추출
  const adminData = req.body; // 요청 본문에서 관리자 데이터 추출
  try {
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
      errorMessage =
        '이 관리자는 현재 다른 데이터와 연관되어 있어서 업데이트할 수 없습니다.';
    }
    res.status(500).json({
      message: errorMessage,
      error: err.code,
    });
  }
});

// @관리자 로그아웃
// @Endpoint POST /api/admins/logout
// @access admin_s, admin_c
const logoutAdmin = asyncHandler(async (req, res) => {
  try {
    const adminId = req.body.admin_idx;
    console.log('로그아웃 관리자 id: ', req.body);
    await cmsLogModel.logAuthAttempt(adminId, 'T', req.ip, true);

    // 세션 파일 스토어에서 세션 삭제
    req.session.destroy(function (err) {
      if (err) {
        console.error('세션 삭제 중 오류 발생:', err);
      } else {
        // 세션 쿠키 삭제
        res.clearCookie('connect.sid');

        res.status(200).json({ message: '로그아웃 되었습니다.' });
      }
    });
  } catch (error) {
    await cmsLogModel.logAuthAttempt(admin, 'F', req.ip, false);
    console.error('Logout failed:', error);
    res.status(500).json({ message: '로그아웃 처리 중 문제가 발생했습니다.' });
  }
});

// @관리자 로그 조회
// @Endpoint GET /api/admins/logs
// @access admin_s
const adminLogs = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const [logs] = await cmsLogModel.findAll({ page, limit });
    // 로그 조회 결과 응답
    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const getSessionData = asyncHandler(async (req, res) => {
  console.log('(getSessionData) called : ', req.session);
  try {
    const sessionData = req.session.admin;
    if (sessionData) {
      res.status(200).json({
        message: '세션 정보가 존재합니다.',
        admin: sessionData,
      });
    } else {
      res.status(404).json({
        message: '세션 정보가 존재하지 않습니다.',
      });
    }
  } catch (error) {
    console.error('세션 정보 조회 실패', error);
    res.status(500).json({ message: '세션 정보 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = {
  businessList,
  createAdmin,
  loginAdmin,
  updateAdmin,
  adminLogs,
  logoutAdmin,
  getSessionData
};
