// adminQueries.js

module.exports = {
  // 관리자 등록 쿼리문
  createAdminQuery: `INSERT INTO cms_admins 
                    (admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
  // 관리자 로그인 쿼리문
  loginAdminQuery: `SELECT * FROM cms_admins WHERE admin_email = ?`,
  // 관리자 조회 쿼리문
  findAdminQuery: `SELECT * FROM cms_admins`,
  // 관리자 정보 수정(Update) 쿼리문
  updateAdminQuery: `UPDATE cms_admins SET admin_email = ?, admin_password = ?, admin_name = ?, admin_tel = ?, admin_role = ?, admin_status = ?, admin_business_name = ?, updated_at = ? WHERE admin_idx = ?`,

  createBusinessQuery: `INSERT INTO cms_businesses (business_name, business_tel, business_address, business_status, business_type, business_owner_idx) VALUES (?, ?, ?, ?, ?, ?)`,

  /* 다른 쿼리문을 여기에 추가 */
};
