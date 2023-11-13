// 사용자 관련 API
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { getAdmins } = require('../controllers/adminController');

const connectDb = require('../config/dbConnMysql');

// 회원 등록
router.route('/register').post((req, res) => {
  res.status(200).json({ message: '회원 가입' });
});

// 사용자 로그인
router.route('/login').post((req, res) => {
  res.status(200).json({ message: `사용자 로그인` });
});

// 사용자 정보 조회
router.route('/:userId').get((req, res) => {
  res.status(200).json({ message: `사용자 정보 조회` });
});

// 사용자 정보 변경
router.route('/:userId').put((req, res) => {
  res.status(200).json({ message: `사용자 정보 변경` });
});

// 회원 탈퇴
router.route('/:userId').delete((req, res) => {
  res.status(200).json({ message: `회원 탈퇴` });
});

module.exports = router;
