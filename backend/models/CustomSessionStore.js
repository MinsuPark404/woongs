const session = require('express-session');
const db = require('../config/dbConnMysql'); // 실제 데이터베이스 연결 파일 경로로 변경

class CustomSessionStore extends session.Store {
  constructor() {
    super();
  }

  // 세션 데이터 가져오기
  async get(sessionId, callback) {
    try {
      const [rows] = await db.query('SELECT data FROM sessions WHERE session_id = ? AND expires > UNIX_TIMESTAMP()', [sessionId]);
      if (rows.length > 0) {
        const sessionData = JSON.parse(rows[0].data);
        callback(null, sessionData);
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  }

  // 세션 저장 또는 업데이트
  async set(sessionId, session, callback) {
    try {
      const expires = session.cookie.expires
        ? Math.floor(session.cookie.expires.getTime() / 1000)
        : Math.floor(Date.now() / 1000) + 86400; // 현재 시간에서 1일(86400초) 후
      const data = JSON.stringify(session);
      await db.query('REPLACE INTO sessions (session_id, expires, data) VALUES (?, ?, ?)', [sessionId, expires, data]);
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  // 세션 삭제
  async destroy(sessionId, callback) {
    try {
      await db.query('DELETE FROM sessions WHERE session_id = ?', [sessionId]);
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  // 세션 만료 시간 업데이트 (선택적)
  async touch(sessionId, session, callback) {
    // try {
    //   const expires = session.cookie.expires
    //     ? Math.floor(session.cookie.expires.getTime() / 1000)
    //     : Math.floor(Date.now() / 1000) + 86400; // 현재 시간에서 1일(86400초) 후
    //   await db.query('UPDATE sessions SET expires = ? WHERE session_id = ?', [expires, sessionId]);
    //   callback(null);
    // } catch (err) {
    //   callback(err);
    // }
    callback();
  }
}

module.exports = CustomSessionStore;