const db = require('../config/dbConnMysql');
const { adminQueries } = require('./_Queries');

// 관리자 정보 등록
const createAdmin = async (adminData) => {
  try {
    const { admin_email, admin_password, admin_name, admin_tel, admin_role, admin_status, business_bno } = adminData;
    const params = [admin_email, admin_password, admin_name, admin_tel, admin_role, admin_status, business_bno];
    const results = await db.query(adminQueries.createAdminQuery, params);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 이메일를 통해 관리자 조회
const findAdminByEmail = async (admin_email) => {
  try {
    const [results] = await db.query(adminQueries.loginAdminQuery, [admin_email]);
    return results;
  } catch (error) {
    throw error;
  }
};

// 관리자 업데이트
const updateAdminData = async (adminId, adminData) => {
  try {
    const { admin_email, admin_name, admin_role, admin_status } = adminData;
    const results = await db.query(adminQueries.updateAdminQuery, [admin_email, admin_name, admin_role, admin_status, adminId]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 관리자 정보 조회
const getAlladmins = async () => {
  try {
    const [results] = await db.query(adminQueries.getAlladminsQuery);
    return results;
  } catch (error) {
    throw error;
  }
};

// 특정 관리자 로그인 기록 조회
const getAdminLoginLogs = async (id) => {
  try {
    const [results] = await db.query(`SELECT * FROM cms_log`, [id]);
    return results;
  } catch (error) {
    throw error;
  }
};

// 관리자 정보 삭제
const deleteAdmin = async (adminId) => {
  try {
    const results = await db.query(adminQueries.deleteAdminQuery, [adminId]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAdmin,
  findAdminByEmail,
  updateAdminData,
  getAlladmins,
  getAdminLoginLogs,
  deleteAdmin,
};
