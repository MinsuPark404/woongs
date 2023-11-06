// adminQueries.js

module.exports = {
  // 관리자 등록 쿼리문
  createAdminQuery: `INSERT INTO admins (
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
  // 관리자 로그인 쿼리문
  loginAdminQuery: `SELECT * FROM admins WHERE admin_email = ?`,

  // 관리자 조회 쿼리문
  getAdminQuery: `SELECT * FROM admins WHERE admin_id`,

  /* 다른 쿼리문을 여기에 추가 */
};
