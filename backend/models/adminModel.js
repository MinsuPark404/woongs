const db = require('../config/dbConnMysql');
const queries = require('./adminQueries');

// 관리자 등록
const createAdmin = async (adminData) => {
  console.log("adminData: ", adminData)
  const {admin_email,admin_password,admin_name,admin_tel,admin_role, admin_status,admin_business_name} = adminData;
  const results = await db.query(queries.createAdminQuery, [admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name]);
  return results[0];
};

// 관리자 이메일 조회
const findAdminByEmail = async (admin_email) => {
  try {
    console.log("admin_email: ", admin_email)
    const [results] = await db.query(queries.loginAdminQuery, [admin_email]
    );
    return results
  } catch (error) {
    throw error;
  }
};

// 관리자 업데이트
const updateAdminData = async (adminId, adminData) => {
  console.log("adminId: ",adminId, "adminData: ",adminData)
  try {
    const { admin_email, admin_password, admin_name, admin_tel, admin_role, admin_status, admin_business_name, updated_at } = adminData;
    const results = await db.query(queries.updateAdminQuery, [admin_email, admin_password, admin_name, admin_tel, admin_role, admin_status, admin_business_name, updated_at, adminId]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 관리자 조회
const findAll = async () => {
  try {
    const [results] = await db.query(queries.findAdminQuery);
    return [results]
  } catch (error) {
    throw error;
  }
};

const createBusiness = async (businessData) => {
  try {  
    const {business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url,} = businessData;
    const results = await db.query(queries.createBusinessQuery, [business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url]);
    return results[0];
  }catch(error){
    throw error;
  }
}

module.exports = {
  createAdmin,
  findAdminByEmail,
  updateAdminData,
  findAll,
  createBusiness,
};
