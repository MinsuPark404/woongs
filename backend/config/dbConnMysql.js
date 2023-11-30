const mysql = require('mysql2/promise');

const connectDb = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await connectDb.getConnection();
    console.log('MySQL 연결 성공...');
    connection.release();
  } catch (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('데이터베이스 연결이 종료되었습니다.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('데이터베이스에 너무 많은 연결이 있습니다.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('데이터베이스 연결이 거부되었습니다.');
    }
    console.error('MySQL 연결 오류:', err);
  }
})();

module.exports = connectDb;
