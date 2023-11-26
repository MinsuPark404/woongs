const adminQueries = {
  // 관리자 등록 쿼리문
  createAdminQuery: `
    INSERT INTO cms_admins 
    (
      admin_email, 
      admin_password, 
      admin_name, 
      admin_tel, 
      admin_role, 
      admin_status, 
      business_bno
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  // 관리자 로그인 쿼리문
  loginAdminQuery: `
    SELECT a.*, 
    (
      SELECT b.business_name 
      FROM cms_businesses b 
      WHERE b.business_bno = a.business_bno
    ) AS business_name
    FROM cms_admins a 
    WHERE admin_email = ?
  `,
  // 관리자 조회 쿼리문
  // getAlladminsQuery: `SELECT * FROM cms_admins`,
  getAlladminsQuery: `
    SELECT 
      a.admin_name,
      a.admin_tel,
      a.admin_email,
      a.admin_role,
      a.admin_status,
      (
        SELECT b.business_name 
        FROM cms_businesses b
        WHERE b.business_bno = a.business_bno
      ) AS business_name
    FROM cms_admins a
  `,

  // 관리자 정보 수정(Update) 쿼리문
  // updateAdminQuery: `UPDATE cms_admins SET admin_email = ?, admin_password = ?, admin_name = ?, admin_tel = ?, admin_role = ?, admin_status = ?, business_bno = ?, admin_updated_at = ? WHERE admin_idx = ?`,
  updateAdminQuery: `
    UPDATE cms_admins 
    SET 
      admin_email = ?, 
      admin_name = ?, 
      admin_role = ?, 
      admin_status = ? 
    WHERE admin_idx = ?
  `,
  // 관리자 삭제
  deleteAdminQuery: `
    DELETE FROM cms_admin 
    WHERE admin_id = ?
  `,
  // 어린이집 등록 쿼리문
  // createBusinessQuery: `INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  // 특정 관리자 id 조회 쿼리문
  getAdminByIdQuery: `
    SELECT * 
    FROM cms_admin 
    WHERE admin_id = ?
  `,
};

const BusinessQueries = {
  createBusinessQuery: `
    INSERT INTO cms_businesses 
    (
      business_name, 
      business_admin, 
      business_tel, 
      business_addr1, 
      business_addr2, 
      business_bno, 
      business_url
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  getAllBusinessesQuery: `
    SELECT * 
    FROM cms_businesses
  `,
  updateBusinessQuery: `
    UPDATE cms_businesses 
    SET business_name = ?, 
    business_admin = ?, 
    business_tel = ?, 
    business_addr1 = ?, 
    business_addr2 = ?, 
    business_bno = ?, 
    business_url = ? 
    WHERE business_id = ?
  `,
  deleteBusinessQuery: `
    DELETE FROM cms_businesses 
    WHERE business_id = ?
  `,
};

// 로그 관련 SQL쿼리문
const cmsLogQueries = {
  createLogQuery: `
    INSERT INTO cms_log 
    (
      log_info, 
      log_ip
    ) 
    VALUES (?, ?)
  `,
  logAuthAttemptQuery: `
    INSERT INTO cms_log 
    SET ?
  `,

  findAllLogsQuery: `
    SELECT cms_log_idx,
    DATE_FORMAT(CONVERT_TZ(logged_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS logged_at,
    log_info, log_ip,
    DATE_FORMAT(CONVERT_TZ(logouted_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS logouted_at 
    FROM cms_log
    ORDER BY cms_log_idx DESC
    LIMIT ? OFFSET ?
  `,

  createLogQuery2: `
    INSERT INTO cms_log 
    (
      business_name, 
      admin_name, 
      logged_at, 
      log_info, 
      log_ip, 
      logouted_at, 
      admin_idx
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  getLogByIdQuery: `
    SELECT * 
    FROM cms_log 
    WHERE cms_log_idx = ?
  `,
  updateLogQuery: `
    UPDATE cms_log 
    SET business_name = ?, 
        admin_name = ?, 
        logged_at = ?, 
        log_info = ?, 
        log_ip = ?, 
        logouted_at = ?, 
        admin_idx = ? 
    WHERE cms_log_idx = ?
  `,
  deleteLogQuery: `
    DELETE FROM cms_log 
    WHERE cms_log_idx = ?
  `,
};

//TODO 추후 수정 필요
const contentsQueries = {
  createContentQuery: `
    INSERT INTO cms_contents 
    (content_detail, business_bno, content_created_at, content_updated_at) 
    VALUES (?, ?, ?, ?)
  `,
  updateContentQuery: `
    UPDATE cms_contents 
    SET content_detail = ?, 
        content_updated_at = ? 
    WHERE content_seq = ? AND business_bno = ?
  `,
  deleteContentQuery: `
    DELETE FROM cms_contents 
    WHERE content_seq = ? AND business_bno = ?
  `,
  createMenuQuery: `
    INSERT INTO cms_menu
    (menu_detail, business_bno, menu_created_at, menu_updated_at)
    VALUES (?, ?, ?, ?)
  `,
  updateMenuQuery: `
    UPDATE cms_menu
    SET menu_detail = ?,
        menu_updated_at = ?
    WHERE menu_idx = ? AND business_bno = ?
  `,
  deleteMenuQuery: `
    DELETE FROM cms_menu
    WHERE menu_idx = ? AND business_bno = ?
  `,
};

//TODO 추후 수정 필요
const menuQueries = {
  createMenuQuery: `
    INSERT INTO cms_menu 
    (menu_detail, menu_created_at, menu_updated_at) 
    VALUES (?, ?, ?)
  `,
  getMenuByIdQuery: `
    SELECT * 
    FROM cms_menu 
    WHERE menu_idx = ?
  `,
  updateMenuQuery: `
    UPDATE cms_menu 
    SET menu_detail = ?, 
        menu_updated_at = ? 
    WHERE menu_idx = ?
  `,
  deleteMenuQuery: `
    DELETE FROM cms_menu 
    WHERE menu_idx = ?
  `,
};

//TODO 추후 수정 필요
const urlQueries = {
  createUrlQuery: `
    INSERT INTO cms_url 
    (url_addr, url_status, business_idx, url_archived_at) 
    VALUES (?, ?, ?, ?)
  `,
  getUrlByIdQuery: `
    SELECT * 
    FROM cms_url 
    WHERE url_idx = ?
  `,
  updateUrlQuery: `
    UPDATE cms_url 
    SET url_addr = ?, 
        url_status = ?, 
        business_idx = ?, 
        url_archived_at = ? 
    WHERE url_idx = ?
  `,
  deleteUrlQuery: `
    DELETE FROM cms_url 
    WHERE url_idx = ?
  `,
};

const userQueries = {
  createUserQuery: `
    INSERT INTO cms_users 
    (user_email, user_password, user_name, user_tel, user_role) 
    VALUES (?, ?, ?, ?, ?)
  `,
  getUserByIdQuery: `
    SELECT * 
    FROM cms_users 
    WHERE user_idx = ?
  `,
  updateUserQuery: `
    UPDATE cms_users 
    SET user_email = ?, 
        user_password = ?, 
        user_name = ?, 
        user_tel = ?, 
        user_role = ? 
    WHERE user_idx = ?
  `,
  deleteUserQuery: `
    DELETE FROM cms_users 
    WHERE user_idx = ?
  `,
  // 직원 로그인 쿼리문
  loginUserQuery: `
    SELECT * 
    FROM cms_users 
    WHERE user_email = ?
  `,
  // 직원 조회 쿼리문
  getAllUsersQuery: `
    SELECT * 
    FROM cms_users
  `,
};

const videoQueries = {
  createVideoQuery: `
    INSERT INTO cms_videos 
    (video_name, video_path, video_recoded_at, video_archived_at, video_created_at) 
    VALUES (?, ?, ?, ?, ?)
  `,
  getVideoByIdQuery: `
    SELECT * 
    FROM cms_videos 
    WHERE video_idx = ?
  `,
  updateVideoQuery: `
    UPDATE cms_videos 
    SET video_name = ?, 
        video_path = ?, 
        video_recoded_at = ?, 
        video_archived_at = ?, 
        video_created_at = ? 
    WHERE video_idx = ?
  `,
  deleteVideoQuery: `
    DELETE FROM cms_videos 
    WHERE video_idx = ?
  `,
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
