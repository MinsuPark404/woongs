const db = require('../config/dbConnMysql');

class Business {
  constructor(businessData) {
    this.business_name = businessData.business_name;
    this.business_admin = businessData.business_admin;
    this.business_tel = businessData.business_tel;
    this.business_addr1 = businessData.business_addr1;
    this.business_addr2 = businessData.business_addr2;
    this.business_bno = businessData.business_bno;
    this.business_url = businessData.business_url;
  }

  // 어린이집 정보를 데이터베이스에 추가하는 메소드
  async create() {
    try {
      const [result] = await db.query(
        `INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [this.business_name, this.business_admin, this.business_tel, this.business_addr1, this.business_addr2, this.business_bno, this.business_url]
      );
      return result.insertId; // 삽입된 행의 ID 반환
    } catch (error) {
      throw error; // 에러 발생 시 에러를 던짐
    }
  }

  // 특정 어린이집 정보를 조회하는 정적 메소드
  static async findById(businessIdx) {
    try {
      const [rows] = await db.query(`SELECT * FROM cms_businesses WHERE business_idx = ?`, [businessIdx]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // 어린이집 정보를 업데이트하는 메소드
  async update(businessIdx) {
    try {
      const [result] = await db.query(
        `UPDATE cms_businesses SET business_name = ?, business_admin = ?, business_tel = ?, business_addr1 = ?, business_addr2 = ?, business_bno = ?, business_url = ? WHERE business_idx = ?`,
        [this.business_name, this.business_admin, this.business_tel, this.business_addr1, this.business_addr2, this.business_bno, this.business_url, businessIdx]
      );
      return result.affectedRows; // 영향을 받은 행의 수 반환
    } catch (error) {
      throw error;
    }
  }

  // 어린이집 정보를 삭제하는 정적 메소드
  static async delete(businessIdx) {
    try {
      const [result] = await db.query(`DELETE FROM cms_businesses WHERE business_idx = ?`, [businessIdx]);
      return result.affectedRows; // 영향을 받은 행의 수 반환
    } catch (error) {
      throw error;
    }
  }
}
// 어린이집 추가: INSERT INTO cms_businesses (business_name, business_admin, business_tel, business_addr1, business_addr2, business_bno, business_url) VALUES (?, ?, ?, ?, ?, ?, ?);
// 어린이집 정보 조회: SELECT * FROM cms_businesses WHERE business_idx = ?;
// 어린이집 정보 업데이트: UPDATE cms_businesses SET business_name = ?, business_admin = ?, business_tel = ?, business_addr1 = ?, business_addr2 = ?, business_url = ? WHERE business_idx = ?;
// 어린이집 삭제: DELETE FROM cms_businesses WHERE business_idx = ?;
module.exports = Business;
