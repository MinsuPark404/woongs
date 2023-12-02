const db = require('../config/dbConnMysql');
const { detectQueries } = require('./_Queries');

// 탐지 조회 모델
const detectModel = async () => {
  const [results] = await db.query(detectQueries.getDetectQuery);
  return results;
};

module.exports = {
  detectModel,
};
