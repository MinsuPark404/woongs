//TODO 쿼리메소드 분리
const express = require('express');
const router = express.Router();
const { registerChild, getChild, updateChild, deleteChild, recordAttendance, getAttendanceByDate, getAttendanceByChild } = require('../controllers/childController');

// 원생 등록 API
router.post('/reg/:businessBno', registerChild);

// 원생 정보 조회
router.get('/:businessBno', getChild);

// 원생 정보 수정
router.put('/:childId', updateChild);

// 원생 정보 삭제
router.delete('/:childId', deleteChild);

// 출석 기록
router.post('/attendance', recordAttendance);

// 특정 날짜의 출석 조회
router.get('/attendance/:date', getAttendanceByDate);

//특정 원생의 출석 이력 조회
router.get('/attendance/:childId/:date', getAttendanceByChild);

module.exports = router;
