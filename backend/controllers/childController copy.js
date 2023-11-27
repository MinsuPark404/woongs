const asyncHandler = require('express-async-handler');

const db = require('../config/dbConnMysql');

// @원생 등록
// @Endpoint POST /api/children/reg/:businessBno
const registerChild = asyncHandler(async (req, res) => {
  try {
    const params = {
      child_name: req.body.child_name,
      child_age: req.body.child_age,
      child_gender: req.body.child_gender,
      business_bno: req.params.businessBno,
    };
    const result = await childModel.createChild(params);
    res.status(201).json({
      message: '원생이 성공적으로 등록되었습니다.',
      childId: result.insertId,
    });
  } catch (error) {
    console.error('원생 등록 중 오류 발생:', error);
    res.status(500).json({ message: '원생 등록 중 오류가 발생했습니다.' });
  }
});
// @원생 정보 조회
// @Endpoint GET /api/children/:businessBno?
const getChild = asyncHandler(async (req, res) => {
  try {
    const results = await childModel.getChild();
    res.status(200).json(results);
  } catch (error) {
    console.error('원생 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 조회 중 오류가 발생했습니다.' });
  }
});

// @원생 정보 수정
// @Endpoint PUT /api/children/:childId
const updateChild = asyncHandler(async (req, res) => {
  try {
    const childIdx = req.params.childId;
    const params = {
      child_name: req.body.child_name,
      child_age: req.body.child_age,
      child_gender: req.body.child_gender,
      business_bno: req.body.business_bno,
      child_idx: childIdx,
    };
    const result = await childModel.updateChild(params);
    res.status(200).json({ message: '원생 정보가 성공적으로 수정되었습니다.', result });
  } catch (error) {
    console.error('원생 정보 수정 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 수정 중 오류가 발생했습니다.' });
  }
});

// @원생 정보 삭제
// @Endpoint DELETE /api/children/:childId
const deleteChild = asyncHandler(async (req, res) => {
  try {
    const childIdx = req.params.childId;
    await childModel.deleteChild(childIdx);
    res.status(200).json({ message: '원생 정보가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('원생 정보 삭제 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 삭제 중 오류가 발생했습니다.' });
  }
});

// @출석 기록
// @Endpoint POST /api/childer/attendance
const recordAttendance = asyncHandler(async (req, res) => {
  const { childId, date, bno, status, time } = req.body;
  console.log('중간 로그', req.body);
  try {
    const sql = `INSERT INTO child_attendance (child_idx, attendance_date, business_bno, attendance_status, attendance_time) VALUES (?, ?, ?, ?, ?)`;
    const result = await db.query(sql, req.body);
    console.log(result);
    res.status(201).json({ message: '출석 정보가 성공적으로 기록되었습니다.' });
  } catch (error) {
    console.error('출석 정보 기록 중 오류 발생:', error);
    res.status(500).json({ message: '출석 정보 기록 중 오류가 발생했습니다.' });
  }
});

// @특정 날짜의 출석 조회
// @Endpoint GET /api/childer/attendance/:date
const getAttendanceByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  console.log(date);
  try {
    const sql = `SELECT * FROM child_attendance WHERE attendance_date = ?`;
    const [rows] = await db.query(sql, [date]);
    res.json(rows);
  } catch (error) {
    console.error('출석 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '출석 정보 조회 중 오류가 발생했습니다.' });
  }
});

// @특정 원생의 출석 이력 조회
// @Endpoint GET /api/childer/attendance/:childId/:date
const getAttendanceByChild = asyncHandler(async (req, res) => {
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

module.exports = {
  registerChild,
  getChild,
  updateChild,
  deleteChild,
  recordAttendance,
  getAttendanceByDate,
  getAttendanceByChild,
};
