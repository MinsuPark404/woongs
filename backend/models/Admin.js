// models/Admin.js

const db = require('../config/dbConnMysql');

class Admin {
  constructor(adminData) {
    this.email = adminData.admin_email;
    this.password = adminData.admin_password;
    this.name = adminData.admin_name;
    this.role = adminData.admin_role;
    this.status = adminData.admin_status;
  }

  // 새 관리자를 생성하는 메소드
  async create() {
    try {
      const [result] = await db.query(`INSERT INTO cms_admins (admin_email, admin_password, admin_name, admin_role, admin_status) VALUES (?, ?, ?, ?, ?)`, [
        this.email,
        this.password,
        this.name,
        this.role,
        this.status,
      ]);
      // 결과로 생성된 관리자의 ID를 반환
      return result.insertId;
    } catch (error) {
      throw error; // 에러를 그대로 던지거나, 추가적인 에러 처리
    }
  }

  // 관리자 정보를 업데이트하는 메소드
  async update(adminIdx) {
    try {
      const [result] = await db.query(`UPDATE cms_admins SET admin_email = ?, admin_password = ?, admin_name = ?, admin_role = ?, admin_status = ? WHERE admin_idx = ?`, [
        this.email,
        this.password,
        this.name,
        this.role,
        this.status,
        adminIdx,
      ]);
      // 결과로 영향받은 행의 수를 반환
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // 관리자를 삭제하는 메소드
  static async delete(adminIdx) {
    try {
      const [result] = await db.query(`DELETE FROM cms_admins WHERE admin_idx = ?`, [adminIdx]);
      // 결과로 영향받은 행의 수를 반환
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // 관리자 정보를 조회하는 메소드
  static async findById(adminIdx) {
    try {
      const [rows] = await db.query(`SELECT * FROM cms_admins WHERE admin_idx = ?`, [adminIdx]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
}
// 관리자 추가: INSERT INTO cms_admins (admin_email, admin_password, admin_name, admin_role, admin_status) VALUES (?, ?, ?, ?, ?);
// 관리자 정보 조회: SELECT * FROM cms_admins WHERE admin_idx = ?;
// 관리자 정보 업데이트: UPDATE cms_admins SET admin_email = ?, admin_name = ?, admin_role = ?, admin_status = ? WHERE admin_idx = ?;
// 관리자 로그인 정보 업데이트: UPDATE cms_admins SET admin_last_login = now() WHERE admin_email = ?;
// 관리자 삭제: DELETE FROM cms_admins WHERE admin_idx = ?;
module.exports = Admin;
