const asyncHandler = require('express-async-handler');
const childModel = require('../models/childModel');

// @원생 등록
// @Endpoint POST /api/children/reg/:businessBno?
const registerChild = asyncHandler(async (req, res) => {
  const childData = req.body;
  const business_bno = req.session.admin.bno;
  try {
    const result = await childModel.createChild(childData, business_bno);
    res.status(201).json({
      message: '원생이 성공적으로 등록되었습니다.',
      result: result,
    });
  } catch (error) {
    console.error('원생 등록 중 오류 발생:', error);
    res.status(500).json({ message: '원생 등록 중 오류가 발생했습니다.' });
  }
});

// @원생 정보 조회
// @Endpoint GET /api/children/:businessBno?
const getChild = asyncHandler(async (req, res) => {
  const business_bno = req.session.admin.bno;
  try {
    const result = await childModel.getChild(business_bno);
    res.status(200).json(result);
  } catch (error) {
    console.error('원생 정보 조회 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 조회 중 오류가 발생했습니다.' });
  }
});

// @원생 정보 수정
// @Endpoint PUT /api/children/:childId
const updateChild = asyncHandler(async (req, res) => {
  const { childId } = req.params;
  const { child_name, child_age, child_gender, child_class, business_bno } =
    req.body;
  try {
    const result = await childModel.updateChild(
      childId,
      child_name,
      child_age,
      child_gender,
      child_class,
      business_bno
    );
    res.status(200).json(result);
  } catch (error) {
    console.error('원생 정보 수정 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 수정 중 오류가 발생했습니다.' });
  }
});

// @원생 정보 삭제
// @Endpoint DELETE /api/children/:childId
const deleteChild = asyncHandler(async (req, res) => {
  const { childId } = req.params;
  try {
    const result = await childModel.deleteChild(childId);
    res.status(200).json(result);
  } catch (error) {
    console.error('원생 정보 삭제 중 오류 발생:', error);
    res.status(500).json({ message: '원생 정보 삭제 중 오류가 발생했습니다.' });
  }
});

// @출석 기록
// @Endpoint POST /api/childer/attendance
const recordAttendance = asyncHandler(async (req, res) => {
  const {
    child_idx,
    attendance_status,
    business_bno,
    attendance_date,
    attendance_time,
  } = req.body;
  try {
    const result = await childModel.recordAttendance(
      child_idx,
      attendance_status,
      business_bno,
      attendance_date,
      attendance_time
    );
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
  const business_bno = req.session.admin.bno;
  const { date } = req.params;
  console.log('선택한 날짜 확인:', date);
  try {
    const result = await childModel.getAttendanceByDate(business_bno, date);
    res.status(200).json(result);
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
    const result = await childModel.getAttendanceByChild(childId);
    res.status(200).json(result);
  } catch (error) {
    console.error('원생의 출석 이력 조회 중 오류 발생:', error);
    res
      .status(500)
      .json({ message: '원생의 출석 이력 조회 중 오류가 발생했습니다.' });
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
