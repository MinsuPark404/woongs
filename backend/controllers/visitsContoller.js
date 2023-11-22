const asyncHandler = require('express-async-handler');

const db = require('../config/dbConnMysql');
// const visitsModel = require('../models/visitsModel');

const getVisitsByDate = asyncHandler(async (req, res) => {
  try {
    // 현재 날짜와 시간
    const now = new Date();
    const month = now.getMonth() + 1; // 월 (1-12)
    const day = now.getDate(); // 일 (1-31)

    // 데이터베이스 쿼리
    const monthlyQuery = `SELECT COUNT(*) AS monthlyVisits FROM cms_log WHERE MONTH(logged_at) = ? AND YEAR(logged_at) = ?`;
    const dailyQuery = `SELECT COUNT(*) AS dailyVisits FROM cms_log WHERE DATE(logged_at) = ?`;

    // 월별 및 일별 방문자 수 조회
    const [monthlyVisits] = await db.query(monthlyQuery, [
      month,
      now.getFullYear(),
    ]);
    const [dailyVisits] = await db.query(dailyQuery, [
      `${now.getFullYear()}-${month}-${day}`,
    ]);

    // 결과 반환
    res.status(200).json({
      month: month,
      day: day,
      monthlyVisits: monthlyVisits[0].monthlyVisits, // 월간 방문자
      dailyVisits: dailyVisits[0].dailyVisits, // 일일 방문자
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { getVisitsByDate };
