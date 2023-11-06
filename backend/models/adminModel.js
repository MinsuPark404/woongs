const db = require('../config/dbConnMysql');
const { createAdminQuery, loginAdminQuery } = require('./adminQueries');

const createAdmin = async (adminData) => {
  const results = await db.query(createAdminQuery, Object.values(adminData));
  return results[0];
};

const getAdminByEmail = async (admin_email) => {
  // MySQL에 연결하고 이메일로 관리자 정보 검색
  const conn = await db.getConnection();
  const [results] = await conn.query(loginAdminQuery, [admin_email]);
  conn.release();
  // 검색된 관리자가 없는 경우 (반환된 데이터가 없는 경우)
  if (results.length === 0) {
    throw new Error('아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.');
  }
  return results[0];
};

const verifyAdminPassword = async (inputPassword, adminPassword) => {
  if (inputPassword === adminPassword) {
    return true;
  }
  return false;
};

module.exports = {
  createAdmin,
  getAdminByEmail,
  verifyAdminPassword,
};
