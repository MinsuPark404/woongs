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
  console.log("관리자 로그 정보", admin);
  
  const params = {
    business_name: admin.business_name,
    admin_name: admin.admin_name,
    // logged_at: new Date(), // 이 부분을 제거
    log_info: logInfo,
    log_ip: ip,
    // logouted_at: null, // 이 부분을 제거 또는 서버에서 처리하도록 변경
    admin_idx: admin.admin_idx,
  };

  console.log("params 데이터:", params);
  
  // MySQL의 NOW() 함수를 사용하여 logged_at와 logouted_at 값을 설정
  const results = await db.query(`
    INSERT INTO cms_log (business_name, admin_name, log_info, log_ip, admin_idx, logged_at, logouted_at) 
    VALUES (?, ?, ?, ?, ?, NOW(), NULL)`, 
    [params.business_name, params.admin_name, params.log_info, params.log_ip, params.admin_idx]);

  console.log("results:", results);
  return results;
};

// 모든 로그인 정보 조회
const findAll = async ({ page, limit }) => {
  const offset = (page - 1) * limit;
  const results = await db.query(cmsLogQueries.findAllLogsQuery, [
    limit,
    offset,
  ]);
  return results;
};

// const findAll = async () => {
//   const [results] = await db.query(`SELECT * FROM cms_log`);
//   return results;
// };

module.exports = { logAuthAttempt, create, findAll };
