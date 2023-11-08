const db = require('../config/dbConnMysql');
const queries = require('./adminQueries');

// 관리자 등록
const createAdmin = async (adminData) => {
  console.log("adminData: ", adminData)
  const {admin_email,admin_password,admin_name,admin_tel,admin_role, admin_status,admin_business_name} = adminData;
  const results = await db.query(queries.createAdminQuery, [admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name]);
  return results[0];
};

const findAdminByEmail = async (admin_email) => {
  try {
    console.log("admin_email: ", admin_email)
    const [results] = await db.query(queries.loginAdminQuery, [admin_email]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error; // 데이터베이스 쿼리 오류를 던짐
  }
};

const updateAdminData = async (adminId, adminData) => {
  try {
    const results = await db.query(queries.updateAdminQuery,
      [adminData.admin_email,
        adminData.admin_password,
        adminData.admin_name,
        adminData.admin_tel,
        adminData.admin_role,
        adminData.admin_status,
        adminData.admin_business_name,
        adminData.updated_at,
        adminId,]
    );
    return results[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAdmin,
  findAdminByEmail,
  updateAdminData,
};
