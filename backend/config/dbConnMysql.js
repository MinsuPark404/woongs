const mysql = require('mysql2/promise');

const connectDb = mysql.createPool({
  host: 'project-db-stu3.smhrd.com',
  user: 'Insa4_JSB_final_1',
  password: 'aishcool1',
  port: 3307,
  database: 'Insa4_JSB_final_1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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

  if (connection) connection.release();

  return;
});

console.log('MySQL 연결 성공...');

module.exports = connectDb;
