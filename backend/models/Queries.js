const adminQueries = {
  // 관리자 등록 쿼리문
  createAdminQuery: `INSERT INTO cms_admins (admin_email, admin_password, admin_name,admin_tel, admin_role, admin_status,admin_business_name) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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
};

const BusinessQueries = {
  createBusinessQuery: `INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  getAllBusinessesQuery: `SELECT * FROM cms_businesses`,
  updateBusinessQuery: `UPDATE cms_businesses SET business_name = ?, business_admin = ?, business_tel = ?, business_addr1 = ?, business_addr2 = ?, business_bno = ?, business_url = ? WHERE business_id = ?`,
  deleteBusinessQuery: `DELETE FROM cms_businesses WHERE business_id = ?`,
};

const cmsLogQueries = {
  createLogQuery: `INSERT INTO cms_log (log_info, log_ip) VALUES (?, ?)`,
  logAuthAttemptQuery: `INSERT INTO cms_log SET ?`,
  findAllLogsQuery: `SELECT * FROM cms_log LIMIT ? OFFSET ?`,

  createLogQuery2: `INSERT INTO cms_log (business_name, admin_name, logged_at, log_info, log_ip, logouted_at, admin_idx) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  getLogByIdQuery: `SELECT * FROM cms_log WHERE cms_log_idx = ?`,
  updateLogQuery: `UPDATE cms_log SET business_name = ?, admin_name = ?, logged_at = ?, log_info = ?, log_ip = ?, logouted_at = ?, admin_idx = ? WHERE cms_log_idx = ?`,
  deleteLogQuery: `DELETE FROM cms_log WHERE cms_log_idx = ?`,
};

const contentsQueries = {
  createContentQuery: `INSERT INTO cms_contents (content_detail, business_name, content_created_at, content_updated_at) VALUES (?, ?, ?, ?)`,
  getContentByIdQuery: `SELECT * FROM cms_contents WHERE content_seq = ?`,
  updateContentQuery: `UPDATE cms_contents SET content_detail = ?, business_name = ?, content_updated_at = ? WHERE content_seq = ?`,
  deleteContentQuery: `DELETE FROM cms_contents WHERE content_seq = ?`,
};

const menuQueries = {
  createMenuQuery: `INSERT INTO cms_menu (menu_detail, menu_created_at, menu_updated_at) VALUES (?, ?, ?)`,
  getMenuByIdQuery: `SELECT * FROM cms_menu WHERE menu_idx = ?`,
  updateMenuQuery: `UPDATE cms_menu SET menu_detail = ?, menu_updated_at = ? WHERE menu_idx = ?`,
  deleteMenuQuery: `DELETE FROM cms_menu WHERE menu_idx = ?`,
};

const urlQueries = {
  createUrlQuery: `INSERT INTO cms_url (url_addr, url_status, business_idx, url_archived_at) VALUES (?, ?, ?, ?)`,
  getUrlByIdQuery: `SELECT * FROM cms_url WHERE url_idx = ?`,
  updateUrlQuery: `UPDATE cms_url SET url_addr = ?, url_status = ?, business_idx = ?, url_archived_at = ? WHERE url_idx = ?`,
  deleteUrlQuery: `DELETE FROM cms_url WHERE url_idx = ?`,
};

const userQueries = {
  createUserQuery: `INSERT INTO cms_users (user_email, user_password, user_name, user_tel, user_role) VALUES (?, ?, ?, ?, ?)`,
  getUserByIdQuery: `SELECT * FROM cms_users WHERE user_idx = ?`,
  updateUserQuery: `UPDATE cms_users SET user_email = ?, user_password = ?, user_name = ?, user_tel = ?, user_role = ? WHERE user_idx = ?`,
  deleteUserQuery: `DELETE FROM cms_users WHERE user_idx = ?`,
};

const videoQueries = {
  createVideoQuery: `INSERT INTO cms_videos (video_name, video_path, video_recoded_at, video_archived_at, video_created_at) VALUES (?, ?, ?, ?, ?)`,
  getVideoByIdQuery: `SELECT * FROM cms_videos WHERE video_idx = ?`,
  updateVideoQuery: `UPDATE cms_videos SET video_name = ?, video_path = ?, video_recoded_at = ?, video_archived_at = ?, video_created_at = ? WHERE video_idx = ?`,
  deleteVideoQuery: `DELETE FROM cms_videos WHERE video_idx = ?`,
};

module.exports = {
  adminQueries,
  BusinessQueries,
  cmsLogQueries,
  contentsQueries,
  menuQueries,
  urlQueries,
  userQueries,
  videoQueries,
};
