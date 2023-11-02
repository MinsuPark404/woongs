const mysql = require('mysql2');

const connectDb = mysql.createConnection({
  host: 'project-db-stu3.smhrd.com',
  user: 'Insa4_JSB_hacksim_3',
  password: 'aishcool3',
  port: 3307,
  database: 'Insa4_JSB_hacksim_3',
});

connectDb.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('MySQL Connected...');
});

module.exports = connectDb;
