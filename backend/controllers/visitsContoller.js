const asyncHandler = require('express-async-handler');
const visitsModel = require('../models/visitsModel');

// 월별 및 일별 방문자 수 조회
// @Endpoint GET /api/visits
const getVisitsByDate = asyncHandler(async (req, res) => {
  // 현재 날짜 정보 가져오기
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 모델을 통해 월별 및 일별 방문자 수 조회
  const monthlyVisits = await visitsModel.getMonthlyVisits(month, now.getFullYear());
  const dailyVisits = await visitsModel.getDailyVisits(`${now.getFullYear()}-${month}-${day}`);

  // 조회 결과를 JSON 형식으로 클라이언트에 응답
  res.status(200).json({
    month,
    day,
    monthlyVisits: monthlyVisits[0].monthlyVisits,
    dailyVisits: dailyVisits[0].dailyVisits
  });
});

// 사용자별 맞춤 페이지 방문자 수 조회
// @Endpoint GET /api/visits/domain
const getDomainVisitsByDate = asyncHandler(async (req, res) => {
  // 현재 날짜 정보 가져오기
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 모델을 통해 월별 및 일별 도메인 방문자 수 조회
  const monthlyDomainVisits = await visitsModel.getMonthlyDomainVisits(month, now.getFullYear());
  const dailyDomainVisits = await visitsModel.getDailyDomainVisits(`${now.getFullYear()}-${month}-${day}`);

  // 조회 결과를 JSON 형식으로 클라이언트에 응답
  res.status(200).json({
    month,
    day,
    monthlyDomainVisits,
    dailyDomainVisits
  });
});

module.exports = { getVisitsByDate, getDomainVisitsByDate };
