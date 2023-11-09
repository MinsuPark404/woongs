const db = require('../config/dbConnMysql');

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
    const results = await db.query(
      `INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        business_name,
        business_admin,
        business_tel,
        business_addr1,
        business_addr2,
        business_bno,
        business_url,
      ]
    );
  } catch (error) {
    throw error;
  }
};

//

module.exports = {
  createBusiness,
};
