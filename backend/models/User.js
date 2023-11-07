const db = require('../config/dbConnMysql');

class User {
  constructor(userData) {
    this.user_email = userData.user_email;
    this.user_password = userData.user_password;
    this.user_name = userData.user_name;
    this.user_tel = userData.user_tel;
    this.user_role = userData.user_role;
  }

  // 직원 정보를 데이터베이스에 추가하는 메소드
  async create() {
    try {
      const [result] = await db.query(`INSERT INTO cms_users (user_email, user_password, user_name, user_tel, user_role) VALUES (?, ?, ?, ?, ?)`, [
        this.user_email,
        this.user_password,
        this.user_name,
        this.user_tel,
        this.user_role,
      ]);
      return result.insertId; // 추가된 행의 Idx(순번) 반환
    } catch (error) {
      throw error; // 에러 발생 시 에러를 던짐
    }
  }

  // 특정 직원의 정보를 조회하는 정적 메소드
  static async findById(userIdx) {
    try {
      const [rows] = await db.query(`SELECT * FROM cms_users WHERE user_idx = ?`, [userIdx]);
    } catch (error) {
      throw error;
    }
  }

  // 직원의 정보를 업데이트하는 메소드
  async update(userIdx) {
    try {
      const [result] = await db.query(`UPDATE cms_users SET user_email = ?, user_name = ?, user_tel = ?, user_role = ? WHERE user_idx = ?`, [
        this.user_email,
        this.user_password,
        this.user_name,
        this.user_tel,
        this.user_role,
        userIdx,
      ]);
      // 영향을 받은 행의 수 반환
      // 특정 사용자의 정보를 수정하는 경우에, 그 사용자의 정보가 실제로 수정되었다면
      // '영향을 받은 행의 수'는 1이 됨. 만약 아무런 변동이 없다면 0이 됨
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
  // 직원의 정보를 삭제하는 메소드
  static async delete(userIdx) {
    try {
      const [result] = await db.query(`DELETE FROM cms_users WHERE user_idx = ?`, [userIdx]);
      // 영향을 받은 행의 수 반환
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}
/*
직원 추가: INSERT INTO cms_users (user_email, user_password, user_name, user_tel, user_role) VALUES (?, ?, ?, ?, ?);
직원 정보 조회: SELECT * FROM cms_users WHERE user_idx = ?;
직원 정보 업데이트: UPDATE cms_users SET user_email = ?, user_name = ?, user_tel = ?, user_role = ? WHERE user_idx = ?;
직원 삭제: DELETE FROM cms_users WHERE user_idx = ?;
*/
module.exports = User;
