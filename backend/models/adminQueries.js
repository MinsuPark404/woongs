// adminQueries.js

module.exports = {
  // 관리자 등록 쿼리문
  createAdminQuery: `INSERT INTO cms_admins 
                    (admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
  // 관리자 로그인 쿼리문
  loginAdminQuery: `SELECT * FROM cms_admins WHERE admin_email = ?`,
  // 관리자 조회 쿼리문
  getAlladminsQuery: `SELECT * FROM cms_admins`,
  // 관리자 정보 수정(Update) 쿼리문
  updateAdminQuery: `UPDATE cms_admins SET admin_email = ?, admin_password = ?, admin_name = ?, admin_tel = ?, admin_role = ?, admin_status = ?, admin_business_name = ?, updated_at = ? WHERE admin_idx = ?`,
  // 관리자 삭제
  deleteAdminQuery: `DELETE FROM cms_admin WHERE admin_id = ?`,
  // 어린이집 등록 쿼리문
  createBusinessQuery: `INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  // 특정 관리자 id 조회 쿼리문
  getAdminByIdQuery: `SELECT * FROM cms_admin WHERE admin_id = ?`,

  /* 다른 쿼리문을 여기에 추가 */
};
