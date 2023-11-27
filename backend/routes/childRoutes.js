//TODO 쿼리메소드 분리
const express = require('express');
const router = express.Router();

const db = require('../config/dbConnMysql');

// 원생 등록 API
router.post('/:businessBno', async (req, res) => {
  const { child_name, child_age, child_gender } = req.body;
  const business_bno = req.params.businessBno;

  try {
    const sql = `INSERT INTO children (child_name, child_age, child_gender, business_bno) VALUES (?, ?, ?, ?)`;
    const [results] = await db.query(sql, [child_name, child_age, child_gender, business_bno]);
    res.status(201).json({
      message: '원생이 성공적으로 등록되었습니다.',
      childId: results.insertId,
    });
  } catch (error) {
    console.error('원생 등록 중 오류 발생:', error);
    res.status(500).json({ message: '원생 등록 중 오류가 발생했습니다.' });
  }
});

// 원생 정보 조회
router.get('/:businessBno', async (req, res) => {
  console.log('원생 정보 조회');
  try {
    const sql = `SELECT child_idx, child_name, child_age, child_gender, child_class, business_bno, 
    DATE_FORMAT(CONVERT_TZ(child_created_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS child_created_at 
    FROM children
    WHERE business_bno = "${req.params.businessBno}"
    `;
    const [results] = await db.query(sql);
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('원생 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 조회 중 오류가 발생했습니다.' });
  }
});

// 원생 정보 수정
router.put('/:childId', async (req, res) => {
  const { childId } = req.params;
  const { child_name, child_age, child_gender, business_bno } = req.body;
  try {
    const sql = `UPDATE children SET child_name = ?, child_age = ?, child_gender = ?, business_bno = ? WHERE child_idx = ?`;
    const [results] = await db.query(sql, [child_name, child_age, child_gender, business_bno, childId]);
    res.status(200).json(results);
  } catch (error) {
    console.error('원생 정보 수정 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 수정 중 오류가 발생했습니다.' });
  }
});

// 원생 정보 삭제
router.delete('/:childId', async (req, res) => {
  const { childId } = req.params;
  try {
    const sql = `DELETE FROM children WHERE child_idx = ?`;
    const [results] = await db.query(sql, [childId]);
    res.status(200).json(results);
  } catch (error) {
    console.error('원생 정보 삭제 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 삭제 중 오류가 발생했습니다.' });
  }
});

// 출석 기록
router.post('/attendance', async (req, res) => {
  const { childId, date, status, time } = req.body;
  try {
    const sql = `INSERT INTO child_attendance (child_idx, attendance_date, attendance_status, attendance_time) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [childId, date, status, time]);
    res.status(201).json({ message: '출석 정보가 성공적으로 기록되었습니다.' });
  } catch (error) {
    console.error('출석 정보 기록 중 오류 발생:', error);
    res.status(500).json({ message: '출석 정보 기록 중 오류가 발생했습니다.' });
  }
});

// 특정 날짜의 출석 조회
router.get('/attendance/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const sql = `SELECT * FROM child_attendance WHERE attendance_date = ?`;
    const [rows] = await db.query(sql, [date]);
    res.json(rows);
  } catch (error) {
    console.error('출석 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '출석 정보 조회 중 오류가 발생했습니다.' });
  }
});

//특정 원생의 출석 이력 조회
router.get('/attendance/:childId/:date', async (req, res) => {
  const { childId } = req.params;
  try {
    const sql = `SELECT * FROM child_attendance WHERE child_idx = ?`;
    const [rows] = await db.query(sql, [childId]);
    res.json(rows);
  } catch (error) {
    console.error('원생의 출석 이력 조회 중 오류 발생:', error);
    res.status(500).json({ message: '원생의 출석 이력 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
