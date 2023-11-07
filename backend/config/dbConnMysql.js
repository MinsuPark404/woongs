const mysql = require('mysql2/promise');

// createPool을 사용하여 MySQL 연결 풀 생성
const connectDb = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  port: 3306,
  database: 'Insa4_JSB_hacksim_3',

  // host: 'project-db-stu3.smhrd.com',
  // user: 'Insa4_JSB_hacksim_3',
  // password: 'aishcool3',
  // port: 3307,
  // database: 'Insa4_JSB_hacksim_3',
  waitForConnections: true, // 연결이 사용 가능해질 때까지 기다립니다.
  connectionLimit: 10, // 동시 연결 수 제한
  queueLimit: 0, // 대기열 제한 없음
});

// 연결 풀에 이벤트 리스너를 추가하여 연결 상태를 확인할 수 있습니다.
connectDb.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('데이터베이스 연결이 종료되었습니다.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('데이터베이스에 너무 많은 연결이 있습니다.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('데이터베이스 연결이 거부되었습니다.');
    }
  }

  if (connection) connection.release(); // 연결을 풀에 반환

  return;
});

console.log('MySQL 연결 성공...');

module.exports = connectDb;
