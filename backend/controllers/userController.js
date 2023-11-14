const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const cmsLogModel = require('../models/cmsLogModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 생성
const create = asyncHandler(async (req, res) => {
  try {
    const userData = req.body;
    console.log('요청body: ', userData);
    // 이메일 중복 체크
    const existingUserEmail = await userModel.findUserByEmail(
      userData.user_email
    );
    if (existingUserEmail.length > 0) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }
    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(
      userData.user_password,
      saltRounds
    );
    userData.user_password = hashedPassword; // 해시된 비밀번호로 대체
    // 관리자 데이터 추가
    const newUser = await userModel.createUser(userData);
    return res.status(201).json({
      message: '관리자가 성공적으로 생성되었습니다.',
      userId: newUser.insertId,
    });
  } catch (error) {
    // 에러 로깅
    console.error('user creation failed:', error);
    return res
      .status(500)
      .json({ message: '관리자 생성 중 오류가 발생했습니다.' });
  }
});

// 전체 조회
const findAll = asyncHandler(async (req, res) => {
  const users = await userModel.getAllUsers();

  return res.status(200).json(users);
});

// 특정 조회
const findByUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.getUserById(userId);
  return res.status(200).json(user);
});

// 수정
const update = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const updatedUser = await userModel.updateUser(userId, userData);
  return res.status(200).json(updatedUser);
});

// 삭제
const remove = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const result = await userModel.deleteUser(userId);
  return res.status(200).json(result);
});

// 로그인
// @유저 로그인
// @Endpoint POST /api/user/login
// @access user
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const userData = await userModel.findUserByEmail(user_email);
    const user = userData.length > 0 ? userData[0] : null;

    if (!user || !(await bcrypt.compare(user_password, user.user_password))) {
      await cmsLogModel.logAuthAttempt(user, 'F', req.ip, false);
      return res.status(401).json({ message: '인증 정보가 잘못되었습니다.' });
    }
    // 로그인 성공 시, 세션에 사용자 정보 저장
    req.session.user = {
      id: user.user_idx,
      email: user.user_email,
      name: user.user_name,
      role: user.user_role,
    };
    console.log('세션 정보', req.session.user);

    await cmsLogModel.logAuthAttempt(user, 'T', req.ip, true);

    return res.status(200).json({
      message: '로그인 성공!',
      user: {
        id: user.user_idx,
        email: user.user_email,
        name: user.user_name,
        role: user.user_role,
      },
    });
  } catch (error) {
    console.error('User login failed:', error);
    return res
      .status(500)
      .json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

// 로그아웃

module.exports = { create, findAll, findByUser, update, remove, loginUser };
