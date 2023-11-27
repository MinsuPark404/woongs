const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = process.env.PORT || 5001;
//logger
const morgan = require('morgan');
const isAuthenticated = require('./middleware/isAuthenticated');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json()); // 다시는 절대 순서를 헷갈리지말자

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
      maxAge: 180000, // 쿠키의 생존 기간(세션 유지 시간: 3분)
    },
  })
);

// 정적인 파일 관리
app.use(express.static(path.join(__dirname, '../frontend', 'build')));

// 인증 미들웨어 적용
app.use(isAuthenticated);

// API 라우터
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/domains', require('./routes/domainRoutes'));
app.use('/api/children', require('./routes/childRoutes'));
app.use('/api/contents/:business_bno', require('./routes/contentsRoutes'));
app.use('/api/menus/:business_bno', require('./routes/menuRoutes'));
app.use('/api/visits', require('./routes/visitRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));

// 특정 페이지 라우터
app.use('/editor', (req, res) => {
  console.log('editor');
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index2.html'));
});
app.use('/', (req, res) => {
  console.log('main');
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
