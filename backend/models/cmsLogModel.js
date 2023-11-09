const db = require('../config/dbConnMysql');

// 로그인 정보 추가
const create = async (log_info, log_ip) => {
  const results = await db.query(
    `INSERT INTO cms_log (log_info, log_ip) VALUES (?, ?)`,
    [log_info, log_ip]
  );
  return results;
};

// 관리자 로그를 데이터베이스에 기록
const logAuthAttempt = async (admin, logInfo, ip) => {
  const params = {
    business_name: admin?.admin_business_name,
    admin_name: admin?.admin_name,
    logged_at: new Date(),
    log_info: logInfo,
    log_ip: ip,
    logouted_at: null,
    admin_idx: admin?.admin_idx,
  };
  const results = await db.query('INSERT INTO cms_log SET ?', params);
  return results;
};

// 모든 로그인 정보 조회
const findAll = async ({ page, limit }) => {
  const offset = (page - 1) * limit;
  const results = await db.query('SELECT * FROM cms_log LIMIT ? OFFSET ?', [
    limit,
    offset,
  ]);
  return results;
};

module.exports = { logAuthAttempt, create, findAll };
