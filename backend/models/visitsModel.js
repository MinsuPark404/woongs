const db = require('../config/dbConnMysql');
const {visitsQueries} = require('./_Queries');

// CMS 월간 방문자 수를 조회
const getMonthlyVisits = async (month, year) => {
  const [results] = await db.query(visitsQueries.monthlyVisitsQuery, [month, year]);
  return results;
}

// CMS 일일 방문자 수를 조회
const getDailyVisits = async (date) => {
  const [results] = await db.query(visitsQueries.dailyVisitsQuery, [date]);
  return results;
}

// 홍보페이지(도메인) 월간 방문자 수를 조회
const getMonthlyDomainVisits = async (month, year) => {
  const [results] = await db.query(visitsQueries.monthlyDomainVisitsQuery, [month, year]);
  return results;
}

// 홍보페이지(도메인) 일일 방문자 수를 조회
const getDailyDomainVisits = async (date) => {
  const [results] = await db.query(visitsQueries.dailyDomainVisitsQuery, [date]);
  return results;
}

module.exports = {
  getMonthlyVisits,
  getDailyVisits,
  getMonthlyDomainVisits,
  getDailyDomainVisits
};