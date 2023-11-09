const db = require('../config/dbConnMysql');

// 로그인 정보 추가
const create = async (log_info, log_ip) => {
  const results = await db.query(
    `INSERT INTO cms_log (log_info, log_ip) VALUES (?, ?)`,
    [log_info, log_ip]
  );
  return results;
};

// 로그인 로그를 데이터베이스에 기록
const logLoginAttempt = async (admin, logInfo, ip) => {
  const loginLog = {
    business_name: admin?.admin_business_name,
    admin_name: admin?.admin_name,
    logged_at: new Date(),
    log_info: logInfo,
    log_ip: ip,
    logouted_at: null,
    admin_idx: admin?.admin_idx,
  };
  const results = await db.query('INSERT INTO cms_log SET ?', loginLog);
  return results;
};

// 특정 로그인 정보 조회
const findById = async (params) => {
  const results = await db.query(
    `SELECT * FROM cms_log WHERE cms_log_idx = ?`,
    params
  );
  return results;
};

// 모든 로그인 정보 조회
const findAll = async () => {
  const results = await db.query(`SELECT * FROM cms_log`);
  return results;
};

module.exports = { logLoginAttempt, create, findById, findAll };
