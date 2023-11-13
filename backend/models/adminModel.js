const db = require('../config/dbConnMysql');
const queries = require('../SQL/adminQueries');

// 관리자 정보 등록
const createAdmin = async (adminData) => {
  try {
    console.log('adminData:', adminData);
    console.log('query:', adminQueries);
    const {
      admin_email,
      admin_password,
      admin_name,
      admin_tel,
      admin_role,
      admin_status,
      admin_business_name,
    } = adminData;
    const params = [
      admin_email,
      admin_password,
      admin_name,
      admin_tel,
      admin_role,
      admin_status,
      admin_business_name,
    ];
    const results = await db.query(queries.createAdminQuery, params);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 이메일를 통해 관리자 조회
const findAdminByEmail = async (admin_email) => {
  try {
    console.log('admin_email: ', admin_email);
    const [results] = await db.query(queries.loginAdminQuery, [admin_email]);
    console.log('results : ', results);
    return results;
  } catch (error) {
    throw error;
  }
};

// 관리자 업데이트
const updateAdminData = async (adminId, adminData) => {
  try {
    console.log('adminId: ', adminId, 'adminData: ', adminData);
    const {
      admin_email,
      admin_password,
      admin_name,
      admin_tel,
      admin_role,
      admin_status,
      admin_business_name,
      updated_at,
    } = adminData;
    const results = await db.query(queries.updateAdminQuery, [
      admin_email,
      admin_password,
      admin_name,
      admin_tel,
      admin_role,
      admin_status,
      admin_business_name,
      updated_at,
      adminId,
    ]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 관리자 정보 조회
const getAlladmins = async () => {
  try {
    const [results] = await db.query(queries.getAlladminsQuery);
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
    console.log('adminId:', adminId);
    const results = await db.query(queries.deleteAdminQuery, [adminId]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// // 특정 관리자 조회
// const getAdminById = async (id) => {
//   try {
//     const results = await db.query(queries.getAdminByIdQuery, [id]);
//     return results[0];
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  createAdmin,
  findAdminByEmail,
  updateAdminData,
  getAlladmins,
  getAdminLoginLogs,
  deleteAdmin,
  // getAdminById,
};
