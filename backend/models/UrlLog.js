const db = require('../config/dbConnMysql');

class UrlLog {
  // URL 로그를 데이터베이스에 추가하는 정적 메소드
  static async create(logData) {
    try {
      const [result] = await db.query(`INSERT INTO cms_url_log (log_date, log_time, log_ip) VALUES (?, ?, ?)`, [logData.log_date, logData.log_time, logData.log_ip]);
      return result.insertId; // 삽입된 행의 ID 반환
    } catch (error) {
      throw error; // 에러 발생 시 에러를 던짐
    }
  }

  // 특정 URL 로그 정보를 조회하는 정적 메소드
  static async findById(logIdx) {
    try {
      const [rows] = await db.query(`SELECT * FROM cms_url_log WHERE log_idx = ?`, [logIdx]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // 로그 데이터는 일반적으로 업데이트나 삭제가 필요 없으므로 해당 메소드는 생략합니다.
}
// 로그 기록 추가: INSERT INTO cms_url_log (log_date, log_time, log_ip) VALUES (?, ?, ?);
// 로그 정보 조회: SELECT * FROM cms_url_log WHERE log_idx = ?;
module.exports = UrlLog;
