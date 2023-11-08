const db = require('../config/dbConnMysql');
const queries = require('./adminQueries');

// 관리자 등록
const createAdmin = async (adminData) => {
  const {admin_email,admin_password,admin_name,admin_tel,admin_role, admin_status,admin_business_name} = adminData;
  const results = await db.query(queries.createAdminQuery, [admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name]);
  return results[0];
};

const findAdminByEmail = async (admin_email) => {
  const conn = await db.getConnection();
  try {
    const [results] = await conn.query(
      `SELECT * FROM cms_admins WHERE admin_email = ?`,
      [admin_email]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error; // 데이터베이스 쿼리 오류를 던짐
  } finally {
    conn.release(); // 항상 연결 해제
  }
};

// const findAdminByCompanyNum = async (company_unique) => {
//   const conn = await db.getConnection();
//   try {
//     const [results] = await conn.query(
//       `SELECT * FROM cms_admins WHERE company_unique = ?`,
//       [company_unique]
//     );
//     return results.length > 0 ? results[0] : null;
//   } catch (error) {
//     throw error; // 데이터베이스 쿼리 오류를 던짐
//   } finally {
//     conn.release(); // 항상 연결 해제
//   }
// };

const verifyAdminPassword = async (inputPassword, adminPassword) => {
  if (inputPassword === adminPassword) {
    return true;
  }
  return false;
};

const updateAdminData = async (adminId, adminData) => {
  const conn = await db.getConnection();
  try {
    const results = await conn.query(
      `
    UPDATE admins 
    SET
      admin_email = ?, 
      admin_password = ?, 
      admin_name = ?,
      admin_tel = ?, 
      admin_role = ?, 
      admin_status = ?,
      admin_business_name = ?,
      updated_at = ?
    WHERE admin_id = ?;
  `,
      [
        // List all the fields that you wish to update
        adminData.admin_email,
        adminData.admin_password,
        adminData.admin_name,
        adminData.admin_tel,
        adminData.admin_role,
        adminData.admin_status,
        adminData.admin_business_name,
        adminData.updated_at,
        adminId, // This should be the last parameter as per the WHERE clause
      ]
    );
    return results[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  createAdmin,
  findAdminByEmail,
  verifyAdminPassword,
  updateAdminData,
};
