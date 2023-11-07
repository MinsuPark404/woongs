const db = require('../config/dbConnMysql');

// 로그인 기록 추가: INSERT INTO cms_log (logged_at, log_info, log_ip) VALUES (?, ?, ?);
// 로그아웃 기록 업데이트: UPDATE cms_log SET logouted_at = now() WHERE cms_log_idx = ?;
// 로그 정보 조회: SELECT * FROM cms_log WHERE cms_log_idx = ?;
module.exports = Content;
