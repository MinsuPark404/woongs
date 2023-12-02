const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = process.env.PORT;
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
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 180000 * 20 * 8, // 쿠키의 생존 기간(세션 유지 시간: 8시간)
    },
  })
);

// 정적인 파일 관리
app.use(express.static(path.join(__dirname, '../frontend', 'build'))); // build

// 인증 미들웨어 적용
app.use(isAuthenticated);

// API 라우터
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/domains', require('./routes/domainRoutes'));
app.use('/api/children', require('./routes/childRoutes'));
app.use('/api/contents/:business_bno', require('./routes/contentsRoutes'));
app.use('/api/visits', require('./routes/visitRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/detects', require('./routes/detectRoutes'));

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
