const express = require('express');
const router = express.Router();

const db = require('../config/dbConnMysql');

// 원생 등록
router.post('/', (req, res) => {
  const { child_name, child_age, child_gender, business_bno } = req.body;

  db.query(
    'INSERT INTO children (child_name, child_age, child_gender, business_bno) VALUES (?, ?, ?, ?)',
    [child_name, child_age, child_gender, business_bno],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('원생 등록 중 오류가 발생했습니다.');
      } else {
        res.status(200).send('원생이 성공적으로 등록되었습니다.');
      }
    }
  );
});

// 원생 목록 조회
router.get('/', (req, res) => {
  db.query('SELECT * FROM children', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('원생 정보를 가져오는 중 오류가 발생했습니다.');
    } else {
      res.status(200).json(result);
    }
  });
});

// 원생 정보 업데이트
router.put('/:child_idx', (req, res) => {
  const { child_idx } = req.params;
  const { child_name, child_age, child_gender, business_bno } = req.body;

  db.query(
    'UPDATE children SET child_name = ?, child_age = ?, child_gender = ?, business_bno = ? WHERE child_idx = ?',
    [child_name, child_age, child_gender, business_bno, child_idx],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('원생 정보 업데이트 중 오류가 발생했습니다.');
      } else {
        res.status(200).send('원생 정보가 성공적으로 업데이트되었습니다.');
      }
    }
  );
});

// 원생 삭제
router.delete('/:child_idx', (req, res) => {
  const { child_idx } = req.params;

  db.query(
    'DELETE FROM children WHERE child_idx = ?',
    [child_idx],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('원생 정보 삭제 중 오류가 발생했습니다.');
      } else {
        res.status(200).send('원생 정보가 성공적으로 삭제되었습니다.');
      }
    }
  );
});

// 출석 조회
router.get('/:child_idx/attendance', (req, res) => {
  const { child_idx } = req.params;

  db.query(
    'SELECT * FROM child_attendance WHERE child_idx = ?',
    [child_idx],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('출석 정보를 가져오는 중 오류가 발생했습니다.');
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// 출석 체크
router.post('/:child_idx/attendance', (req, res) => {
  const { child_idx } = req.params;
  const { attendance_date, attendance_status, attendance_time } = req.body;

  db.query(
    'INSERT INTO child_attendance (child_idx, attendance_date, attendance_status, attendance_time) VALUES (?, ?, ?, ?)',
    [child_idx, attendance_date, attendance_status, attendance_time],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('출석 체크 중 오류가 발생했습니다.');
      } else {
        res.status(200).send('출석이 성공적으로 체크되었습니다.');
      }
    }
  );
});

module.exports = router;
