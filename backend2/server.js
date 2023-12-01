const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = 5000;
const morgan = require('morgan');
const isAuthenticated = require('./middleware/isAuthenticated');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

/* MySQL */
const connectDb = require('./config/dbConnMysql');
const sessionStore = new MySQLStore({}, connectDb);

app.use(
  session({
    store: sessionStore, // MySQL에 세션 데이터를 저장
    secret: process.env.SESSION_SECRET, // 세션 암호화에 사용될 키
    resave: false, // 세션을 항상 저장할지 정하는 값 (false 권장)
    saveUninitialized: false, // 세션을 초기화하지 않고 저장할지 정하는 값 (false 권장)
    cookie: {
      httpOnly: true, // 클라이언트 JavaScript가 쿠키를 볼 수 없도록 함
      secure: false, // HTTPS를 통해서만 쿠키가 전송되도록 함
      maxAge: 180000 * 20 * 8, // 쿠키의 생존 기간(세션 유지 시간: 8시간)
    },
  })
);

// 정적인 파일 관리
// app.use(express.static(path.join(__dirname, '../frontend2', 'build')));

// 인증 미들웨어 적용
// app.use(isAuthenticated);


// Create - 새 컨텐츠 추가
app.post('/', async (req, res) => {
  try {
    const { url_html } = req.body;
    const url_addr = '123'
    const business_bno = '916-23-31691';
    const [result] = await connectDb.query(
      'INSERT INTO cms_contents (url_addr, business_bno, url_html) VALUES (?, ?, ?)',
      [url_addr, business_bno, url_html]
    );
    res.status(201).json({ content_idx: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All - 모든 컨텐츠 조회

app.get('/', async (req, res) => {
  try {
    const [rows] = await connectDb.query('SELECT url_html FROM cms_contents where content_idx = 35');
    // console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// app.get('/', async (req, res) => {
//   try {
//     const [rows] = await connectDb.query('SELECT url_html FROM cms_contents where content_idx = 13');
//     const cleanedHtml = rows.map(row => ({
//       ...row,
//       url_html: row.url_html.replace(/\\n/g, "").replace(/\\t/g, "").replace(/\\\\/g, "")
//     }));
//     res.status(200).json(cleanedHtml);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Update - 컨텐츠 수정
// app.put('/', async (req, res) => {
//   try {
//     const { url_addr, url_html } = req.body;
//     const business_bno = '916-23-31691';
//     await connectDb.query(
//       'UPDATE cms_contents SET url_addr = ?, business_bno = ?, url_html = ? WHERE business_bno = ?',
//       [url_addr, business_bno, url_html, business_bno]
//     );
//     res.status(200).json({ message: 'Content updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Delete - 컨텐츠 삭제
// app.delete('/', async (req, res) => {
//   const business_bno = '916-23-31691';
//   try {
//     await connectDb.query('DELETE FROM cms_contents WHERE business_bno = ?', [business_bno]);
//     res.status(200).json({ message: 'Content deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// 특정 페이지 라우터

// app.use('/', (req, res) => {
//   console.log('main');
//   res.sendFile(path.join(__dirname, '../frontend2', 'build', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
///