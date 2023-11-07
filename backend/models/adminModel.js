const db = require('../config/dbConnMysql');
// const { createAdminQuery, loginAdminQuery, updateAdminQuery } = require('./adminQueries');

const createAdmin = async (adminData) => {
  const results = await db.query(
    `INSERT INTO admins (
    admin_name, 
    admin_password, 
    company_name, 
    company_address, 
    company_unique, 
    admin_email, 
    admin_phone, 
    admin_phone2, 
    role, 
    is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    Object.values(adminData)
  );
  return results[0];
};

const findAdminByEmail = async (admin_email) => {
  const conn = await db.getConnection();
  try {
    const [results] = await conn.query(`SELECT * FROM admins WHERE admin_email = ?`, [admin_email]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error; // 데이터베이스 쿼리 오류를 던짐
  } finally {
    conn.release(); // 항상 연결 해제
  }
};

const findAdminByCompanyNum = async (company_unique) => {
  const conn = await db.getConnection();
  try {
    const [results] = await conn.query(`SELECT * FROM admins WHERE company_unique = ?`, [company_unique]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error; // 데이터베이스 쿼리 오류를 던짐
  } finally {
    conn.release(); // 항상 연결 해제
  }
};

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
      admin_name = ?, 
      admin_password = ?, 
      company_name = ?, 
      company_address = ?, 
      company_unique = ?, 
      admin_email = ?, 
      admin_phone = ?, 
      admin_phone2 = ?, 
      role = ?, 
      is_active = ?, 
      created_at = ?, 
      updated_at = ? 
    WHERE admin_id = ?;
  `,
      [
        // List all the fields that you wish to update
        adminData.admin_name,
        adminData.admin_password,
        adminData.company_name,
        adminData.company_address,
        adminData.company_unique,
        adminData.admin_email,
        adminData.admin_phone,
        adminData.admin_phone2,
        adminData.role,
        adminData.is_active,
        adminData.created_at,
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
  findAdminByCompanyNum,
};
