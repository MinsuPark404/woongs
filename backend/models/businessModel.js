const db = require('../config/dbConnMysql');
const { BusinessQueries } = require('./_Queries');

// 어린이집 정보를 데이터베이스에 추가하는 메소드
const createBusiness = async (params) => {
  try {
    console.log('DB에 추가할 정보:', params);
    const {
      business_name,
      business_admin,
      business_tel,
      business_addr1,
      business_addr2,
      business_bno,
      business_url,
    } = params;
    const results = await db.query(BusinessQueries.createBusinessQuery, [
      business_name,
      business_admin,
      business_tel,
      business_addr1,
      business_addr2,
      business_bno,
      business_url,
    ]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 어린이집 정보를 데이터베이스에서 조회하는 메소드
const getBusiness = async () => {
  try {
    const [results] = await db.query(BusinessQueries.getAllBusinessesQuery);
    return results;
  } catch (error) {
    throw error;
  }
};

// 어린이집 정보를 데이터베이스에서 수정하는 메소드
const updateBusiness = async (params) => {
  try {
    const {
      business_name,
      business_admin,
      business_tel,
      business_addr1,
      business_addr2,
      business_bno,
      business_url,
    } = params;
    const results = await db.query(BusinessQueries.updateBusinessQuery, [
      business_name,
      business_admin,
      business_tel,
      business_addr1,
      business_addr2,
      business_bno,
      business_url,
    ]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// 어린이집 정보를 데이터베이스에서 삭제하는 메소드
const deleteBusiness = async (params) => {
  try {
    const { business_id } = params;
    const results = await db.query(BusinessQueries.deleteBusinessQuery, [
      business_id,
    ]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
};
