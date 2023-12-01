const adminQueries = {
  createAdminQuery: `
    INSERT INTO cms_admins 
    (admin_email, admin_password, admin_name, admin_tel, admin_role, admin_status, business_bno) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  loginAdminQuery: `
    SELECT a.*, 
    (SELECT b.business_name FROM cms_businesses b WHERE b.business_bno = a.business_bno) AS business_name
    FROM cms_admins a WHERE admin_email = ?
  `,
  getAlladminsQuery: `
    SELECT a.admin_name, a.admin_tel, a.admin_email, a.admin_role, a.admin_status,
    (SELECT b.business_name FROM cms_businesses b WHERE b.business_bno = a.business_bno) AS business_name
    FROM cms_admins a
  `,
  updateAdminQuery: `
    UPDATE cms_admins SET admin_email = ?, admin_name = ?, admin_role = ?, admin_status = ? 
    WHERE admin_idx = ?
  `,
  deleteAdminQuery: `
    DELETE FROM cms_admin WHERE admin_id = ?
  `,
  getAdminByIdQuery: `
    SELECT * FROM cms_admin WHERE admin_id = ?
  `,
  updateLogoutTimeQuery: `
    UPDATE cms_log SET logouted_at = NOW() WHERE admin_idx = ? ORDER BY cms_log_idx DESC LIMIT 1
  `
};

const BusinessQueries = {
  createBusinessQuery: `
    INSERT INTO cms_businesses 
    (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  getAllBusinessesQuery: `
    SELECT * FROM cms_businesses
  `,
  updateBusinessQuery: `
    UPDATE cms_businesses SET business_name = ?, business_admin = ?, business_tel = ?, business_addr1 = ?, 
    business_addr2 = ?, business_bno = ?, business_url = ? WHERE business_id = ?
  `,
  deleteBusinessQuery: `
    DELETE FROM cms_businesses WHERE business_id = ?
  `
};

const cmsLogQueries = {
  createLogQuery: `
    INSERT INTO cms_log (log_info, log_ip) VALUES (?, ?)
  `,
  logAuthAttemptQuery: `
    INSERT INTO cms_log (business_name, admin_name, log_info, log_ip, admin_idx, logged_at, logouted_at) 
    VALUES (?, ?, ?, ?, ?, NOW(), NULL)
  `,
  findAllLogsQuery: `
    SELECT cms_log_idx,
    DATE_FORMAT(CONVERT_TZ(logged_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS logged_at,
    log_info, log_ip,
    DATE_FORMAT(CONVERT_TZ(logouted_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS logouted_at 
    FROM cms_log ORDER BY cms_log_idx DESC
  `,
  createLogQuery2: `
    INSERT INTO cms_log 
    (business_name, admin_name, logged_at, log_info, log_ip, logouted_at, admin_idx) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  getLogByIdQuery: `
    SELECT * FROM cms_log WHERE cms_log_idx = ?
  `,
  updateLogQuery: `
    UPDATE cms_log SET business_name = ?, admin_name = ?, logged_at = ?, log_info = ?, log_ip = ?, 
    logouted_at = ?, admin_idx = ? WHERE cms_log_idx = ?
  `,
  deleteLogQuery: `
    DELETE FROM cms_log WHERE cms_log_idx = ?
  `
};

const contentsQueries = {
  createContentQuery: `
    INSERT INTO cms_contents (content_detail, business_bno, content_created_at, content_updated_at) 
    VALUES (?, ?, ?, ?)
  `,
  getContentQuery: `
    SELECT * FROM cms_contents WHERE business_bno = ?
  `,
  updateContentQuery: `
    UPDATE cms_contents SET content_detail = ?, content_updated_at = ? WHERE content_seq = ? AND business_bno = ?
  `,
  deleteContentQuery: `
    DELETE FROM cms_contents WHERE content_seq = ? AND business_bno = ?
  `
};

const urlQueries = {
  createUrlQuery: `
    INSERT INTO cms_url (url_addr, url_status, business_idx, url_archived_at) VALUES (?, ?, ?, ?)
  `,
  getUrlByIdQuery: `
    SELECT * FROM cms_url WHERE url_idx = ?
  `,
  updateUrlQuery: `
    UPDATE cms_url SET url_addr = ?, url_status = ?, business_idx = ?, url_archived_at = ? WHERE url_idx = ?
  `,
  deleteUrlQuery: `
    DELETE FROM cms_url WHERE url_idx = ?
  `
};

const userQueries = {
  createUserQuery: `
    INSERT INTO cms_users (user_email, user_password, user_name, user_tel, business_bno, user_role) 
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  getUserByIdQuery: `
    SELECT * FROM cms_users WHERE user_idx = ?
  `,
  updateUserQuery: `
    UPDATE cms_users SET user_email = ?, user_password = ?, user_name = ?, user_tel = ?, user_role = ? 
    WHERE user_idx = ?
  `,
  deleteUserQuery: `
    DELETE FROM cms_users WHERE user_idx = ?
  `,
  loginUserQuery: `
    SELECT * FROM cms_users WHERE user_email = ?
  `,
  getAllUsersQuery: `
    SELECT * FROM cms_users WHERE business_bno = ?
  `,
  findLogsQuery: `
    SELECT l.* FROM cms_log l JOIN cms_businesses b ON l.business_name = b.business_name WHERE b.business_bno = ?
  `
};

const videoQueries = {
  createVideoQuery: `
    INSERT INTO cms_videos (video_name, video_path, video_recoded_at, video_archived_at, video_created_at, business_idx) 
    VALUES (?, ?, ?, ?, NOW(),?)
  `,
  getVideos1: `
    SELECT video_idx, video_name, video_path, 
    DATE_FORMAT(CONVERT_TZ(video_recoded_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_recoded_at, 
    DATE_FORMAT(CONVERT_TZ(video_archived_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_archived_at, 
    DATE_FORMAT(CONVERT_TZ(video_created_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_created_at, 
    business_bno FROM cms_videos WHERE business_bno = ?
  `,
  getVideos2: `
    SELECT video_idx, video_name, video_path, 
    DATE_FORMAT(CONVERT_TZ(video_recoded_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_recoded_at, 
    DATE_FORMAT(CONVERT_TZ(video_archived_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_archived_at, 
    DATE_FORMAT(CONVERT_TZ(video_created_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS video_created_at, 
    business_bno FROM cms_videos
  `,
  getVideosBusinessQuery: `
    SELECT * FROM cms_videos WHERE business_idx = ?
  `,
  getVideosIdQuery: `
    SELECT * FROM cms_videos WHERE video_idx = ?
  `,
  deleteVideoQuery: `
    DELETE FROM cms_videos WHERE video_idx = ?
  `
};

const childQueries = {
  createChildQuery: `
    INSERT INTO children (child_name, child_age, child_gender, child_class, business_bno) VALUES (?, ?, ?, ?, ?)
  `,
  getChildQuery: `
    SELECT child_idx, child_name, child_age, child_gender, child_class, business_bno, 
    DATE_FORMAT(CONVERT_TZ(child_created_at, '+00:00', '+00:00'), '%Y-%m-%d %H:%i:%s') AS child_created_at 
    FROM children WHERE business_bno = ?
  `,
  updateChildQuery: `
    UPDATE children SET child_name = ?, child_age = ?, child_gender = ?, business_bno = ? WHERE child_idx = ?
  `,
  deleteChildQuery: `
    DELETE FROM children WHERE child_idx = ?
  `,
  recordAttendanceQuery: `
    INSERT INTO child_attendance (child_idx, attendance_date, business_bno, attendance_status, attendance_time) 
    VALUES (?, ?, ?, ?, ?)
  `,
  getAttendanceByDateQuery: `
    SELECT * FROM child_attendance WHERE attendance_date = ?
  `,
  getAttendanceByChildQuery: `
    SELECT * FROM child_attendance WHERE child_idx = ?
  `
};

const domainQueries = {
  getDomainQuery: `
    SELECT url_addr, url_status, b.business_name, DATE_FORMAT(url_period_at, '%Y-%m-%d') AS url_period_at
    FROM cms_url u LEFT JOIN cms_businesses b ON u.business_bno = b.business_bno
  `,
  createDomainQuery: `
    INSERT INTO cms_url (url_addr, url_status, business_bno, url_created_at, url_period_at)
    VALUES (?, ?, ?, ?, ?)
  `,
  updateDomainQuery: `
    UPDATE cms_url SET url_addr = ?, url_status = ?, business_bno = ?, url_created_at = ?, url_period_at = ? 
    WHERE url_idx = ?
  `
};

const visitsQueries = {
  monthlyVisitsQuery: `
    SELECT COUNT(*) AS monthlyVisits FROM cms_log WHERE MONTH(logged_at) = ? AND YEAR(logged_at) = ?
  `,
  dailyVisitsQuery: `
    SELECT COUNT(*) AS dailyVisits FROM cms_log WHERE DATE(logged_at) = ?
  `,
  monthlyDomainVisitsQuery: `
    SELECT url_addr, COUNT(*) AS monthlyVisits FROM cms_url_log WHERE MONTH(log_date) = ? AND YEAR(log_date) = ? 
    GROUP BY url_addr
  `,
  dailyDomainVisitsQuery: `
    SELECT url_addr, COUNT(*) AS dailyVisits FROM cms_url_log WHERE DATE(log_date) = ? GROUP BY url_addr
  `
};

const boardQueries = {
  createPost: `
    INSERT INTO board (title, content, user_id) VALUES (?, ?, ?)
  `,
  getPosts: `
    SELECT * FROM board WHERE business_bno = ?
  `,
  getPost: `
    SELECT * FROM board WHERE board_idx = ?
  `,
  updatePost: `
    UPDATE board SET title = ?, content = ? WHERE id = ?
  `,
  deletePost: `
    DELETE FROM board WHERE id = ?
  `
};

module.exports = {
  adminQueries,
  BusinessQueries,
  cmsLogQueries,
  contentsQueries,
  urlQueries,
  userQueries,
  videoQueries,
  childQueries,
  domainQueries,
  visitsQueries,
  boardQueries
};