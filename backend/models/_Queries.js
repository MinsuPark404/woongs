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
  // 특정 관리자 id 조회 쿼리문
  getAdminByIdQuery: `
    SELECT * 
    FROM cms_admin 
    WHERE admin_id = ?
  `,
  updateLogoutTimeQuery:`UPDATE cms_log SET logouted_at = NOW() WHERE admin_idx = ? ORDER BY cms_log_idx DESC LIMIT 1`
};

const BusinessQueries = {
  // 어린이집 등록 쿼리문
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
  INSERT INTO cms_log (business_name, admin_name, log_info, log_ip, admin_idx, logged_at, logouted_at) 
  VALUES (?, ?, ?, ?, ?, NOW(), NULL)`,

  findAllLogsQuery: `
  SELECT cms_log_idx,
  DATE_FORMAT(CONVERT_TZ(logged_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS logged_at,
  log_info, log_ip,
  DATE_FORMAT(CONVERT_TZ(logouted_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS logouted_at 
  FROM cms_log
  ORDER BY cms_log_idx DESC
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
  // 컨텐츠 등록 SQL
  createContentQuery: `
    INSERT INTO cms_contents 
    (content_detail, business_bno, content_created_at, content_updated_at) 
    VALUES (?, ?, ?, ?)
  `,

  // 컨텐츠 조회 SQL(홍보페이지에 사용되는 쿼리)
  getContentQuery: `
  SELECT * 
  FROM cms_contents
  WHERE business_bno = ?
  `,
  // 컨텐츠 수정 SQL
  updateContentQuery: `
    UPDATE cms_contents 
    SET content_detail = ?, 
        content_updated_at = ? 
    WHERE content_seq = ? AND business_bno = ?
  `,

  // 컨텐츠 삭제 SQL
  deleteContentQuery: `
    DELETE FROM cms_contents 
    WHERE content_seq = ? AND business_bno = ?
  `,
};

const menuQueries = {
  // 메뉴 등록 SQL
  createMenuQuery: `
    INSERT INTO cms_menu 
    (menu_detail, business_bno) 
    VALUES (?, ?, ?, ?)
  `,
  // 메뉴 조회 SQL(홍보페이지에 사용되는 쿼리)
  getMenuQuery: `
    SELECT * 
    FROM cms_menu
    WHERE business_bno = ?
  `,
  // 메뉴 수정 SQL
  updateMenuQuery: `
    UPDATE cms_menu 
    SET menu_detail = ?,
    WHERE business_bno = ?
  `,
  // 메뉴마다 지우는 SQL
  deleteMenuQuery: `
    DELETE FROM cms_menu 
    WHERE menu_idx = ?
  `,
};

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
    (user_email, user_password, user_name, user_tel, business_bno, user_role) 
    VALUES (?, ?, ?, ?, ?, ?)
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
  //TODO 슈퍼관리자도 모든 정보 접근
  getAllUsersQuery: `
    SELECT * 
    FROM cms_users
    WHERE business_bno = ?
  `,
  // 로그조회
  findLogsQuery:`
  SELECT l.* 
  FROM cms_log l
  JOIN cms_businesses b ON l.business_name = b.business_name
  WHERE b.business_bno = ?`
};

const videoQueries = {
  createVideoQuery: `INSERT INTO cms_videos (video_name, video_path, video_recoded_at, video_archived_at, video_created_at, business_idx) VALUES (?, ?, ?, ?, NOW(),?)`,
  getVideos1: `SELECT video_idx, video_name, video_path, 
  DATE_FORMAT(CONVERT_TZ(video_recoded_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_recoded_at, 
  DATE_FORMAT(CONVERT_TZ(video_archived_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_archived_at, 
  DATE_FORMAT(CONVERT_TZ(video_created_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_created_at, 
  business_bno 
  FROM cms_videos
  WHERE business_bno = ?`,
  getVideos2: `SELECT video_idx, video_name, video_path, 
  DATE_FORMAT(CONVERT_TZ(video_recoded_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_recoded_at, 
  DATE_FORMAT(CONVERT_TZ(video_archived_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_archived_at, 
  DATE_FORMAT(CONVERT_TZ(video_created_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_created_at, 
  business_bno 
  FROM cms_videos`,
  getVideosBusinessQuery: `SELECT * FROM cms_videos WHERE business_idx = ?`,
  getVideosIdQuery: `SELECT * FROM cms_videos WHERE video_idx = ?`,
  deleteVideoQuery: `DELETE FROM cms_videos WHERE video_idx = ?`,
};

const childQueries = {
  createChildQuery: `INSERT INTO children (child_name, child_age, child_gender, child_class, business_bno) VALUES (?, ?, ?, ?, ?)`,
  getChildQuery: `SELECT child_idx, child_name, child_age, child_gender, child_class, business_bno, 
  DATE_FORMAT(CONVERT_TZ(child_created_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS child_created_at 
  FROM children
  WHERE business_bno = ?
  `,
  updateChildQuery: `UPDATE children SET child_name = ?, child_age = ?, child_gender = ?, business_bno = ? WHERE child_idx = ?`,
  deleteChildQuery: `DELETE FROM children WHERE child_idx = ?`,
  recordAttendanceQuery: `INSERT INTO child_attendance (child_idx, attendance_date, business_bno, attendance_status, attendance_time) VALUES (?, ?, ?, ?, ?)`,
  getAttendanceByDateQuery: `SELECT * FROM child_attendance WHERE attendance_date = ?`,
  getAttendanceByChildQuery: `SELECT * FROM child_attendance WHERE child_idx = ?`,
};

const domainQueries = {
  getDomainQuery: `
    SELECT url_addr,
       url_status,
       b.business_name,
       DATE_FORMAT(url_period_at, '%Y-%m-%d') AS url_period_at
    FROM cms_url u
    LEFT JOIN cms_businesses b ON u.business_bno = b.business_bno;
  `,
  createDomainQuery: `INSERT INTO cms_url (url_addr, url_status, business_bno, url_created_at, url_period_at)
  VALUES (?, ?, ?, ?, ?)`,
  updateDomainQuery: `UPDATE cms_url SET url_addr = ?, url_status = ?, business_bno = ?, url_created_at = ?, url_period_at = ? WHERE url_idx = ?`,
}

const visitsQueries = {
  monthlyVisitsQuery: `SELECT COUNT(*) AS monthlyVisits 
                       FROM cms_log 
                       WHERE MONTH(logged_at) = ? AND YEAR(logged_at) = ?`,

  dailyVisitsQuery: `SELECT COUNT(*) AS dailyVisits 
                     FROM cms_log 
                     WHERE DATE(logged_at) = ?`,

  monthlyDomainVisitsQuery: `SELECT url_addr, COUNT(*) AS monthlyVisits 
                             FROM cms_url_log 
                             WHERE MONTH(log_date) = ? AND YEAR(log_date) = ? 
                             GROUP BY url_addr`,

  dailyDomainVisitsQuery: `SELECT url_addr, COUNT(*) AS dailyVisits 
                           FROM cms_url_log 
                           WHERE DATE(log_date) = ? 
                           GROUP BY url_addr`
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
  childQueries,
  domainQueries,
  visitsQueries
};
