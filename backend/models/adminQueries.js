// adminQueries.js

module.exports = {
  // 관리자 등록 쿼리문
  createAdminQuery: `INSERT INTO cms_admins 
                    (admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
  // 관리자 로그인 쿼리문
  loginAdminQuery: ``,
  // 관리자 조회 쿼리문
  getAdminQuery: ``,
  // 관리자 정보 수정(Update) 쿼리문
  updateAdminQuery: ``,

  /* 다른 쿼리문을 여기에 추가 */
};
