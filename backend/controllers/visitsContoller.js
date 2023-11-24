const asyncHandler = require('express-async-handler');
// const visitsModel = require('../models/visitsModel');

const db = require('../config/dbConnMysql');

// CMS 페이지 방문자 수 조회
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

// 사용자별 맞춤 페이지 방문자 수 조회
const getDomainVisitsByDate = asyncHandler(async (req, res) => {
  try {
    // 현재 날짜와 시간
    const now = new Date();
    const month = now.getMonth() + 1; // 월 (1-12)
    const day = now.getDate(); // 일 (1-31)

    // 데이터베이스 쿼리
    const monthlyQuery = `SELECT url_addr, COUNT(*) AS monthlyVisits 
                          FROM cms_url_log 
                          WHERE MONTH(log_date) = ? AND YEAR(log_date) = ? 
                          GROUP BY url_addr`;
    const dailyQuery = `SELECT url_addr, COUNT(*) AS dailyVisits 
                        FROM cms_url_log 
                        WHERE DATE(log_date) = ? 
                        GROUP BY url_addr`;

    // 월별 및 일별 도메인 방문자 수 조회
    const [monthlyVisits] = await db.query(monthlyQuery, [month, now.getFullYear()]);
    const [dailyVisits] = await db.query(dailyQuery, [`${now.getFullYear()}-${month}-${day}`]);

    // 결과 반환
    res.status(200).json({
      month: month,
      day: day,
      monthlyDomainVisits: monthlyVisits, // 월간 도메인 방문자 수
      dailyDomainVisits: dailyVisits, // 일일 도메인 방문자 수
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { getVisitsByDate, getDomainVisitsByDate };
