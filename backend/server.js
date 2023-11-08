const express = require('express');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv').config();

const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* MongoDB */
// const connectDb = require('./config/dbConnMong');

/* MySQL */
const connectDb = require('./config/dbConnMysql');
app.set('db', connectDb);

const port = process.env.PORT || 5000;

app.use(express.json());

// 라우터 미들웨어
app.use('/api/admins', require('./routes/adminRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// 정적인 파일 관리
app.use(express.static(path.join(__dirname, '../frontend', 'build')));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
