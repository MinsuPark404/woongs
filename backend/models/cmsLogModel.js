const db = require('../config/dbConnMysql');
const { cmsLogQueries } = require('./_Queries');

// 로그인 정보 추가
const create = async (log_info, log_ip) => {
  const results = await db.query(cmsLogQueries.createLogQuery, [
    log_info,
    log_ip,
  ]);
  return results;
};

// 관리자 로그를 데이터베이스에 기록
const logAuthAttempt = async (admin, logInfo, ip) => {
  const params = {
    business_name: admin.business_name,
    admin_name: admin.admin_name,
    log_info: logInfo,
    log_ip: ip,
    admin_idx: admin.admin_idx,
  };
  const results = await db.query(
    `
    INSERT INTO cms_log (business_name, admin_name, log_info, log_ip, admin_idx, logged_at, logouted_at) 
    VALUES (?, ?, ?, ?, ?, NOW(), NULL)`,
    [
      params.business_name,
      params.admin_name,
      params.log_info,
      params.log_ip,
      params.admin_idx,
    ]
  );
  return results;
};

// 모든 로그인 정보 조회
const findAll = async () => {
  const results = await db.query(cmsLogQueries.findAllLogsQuery);
  return results;
};

module.exports = { logAuthAttempt, create, findAll };
