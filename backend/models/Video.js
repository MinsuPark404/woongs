const db = require('../config/dbConnMysql');

class Video {
  constructor(videoData) {
    this.video_name = videoData.video_name;
    this.video_path = videoData.video_path;
    this.video_recorded_at = new Date(videoData.video_recorded_at); // 촬영일자
    this.video_archived_at = new Date(this.video_recorded_at);
    this.video_archived_at.setDate(this.video_recorded_at.getDate() + 90);
  }

  // 영상을 데이터베이스에 추가하는 메소드
  async create() {
    try {
      const [result] = await db.query(`INSERT INTO cms_videos (video_name, video_path, video_recorded_at, video_archived_at) VALUES (?, ?, ?, ?)`, [
        this.video_name,
        this.video_path,
        this.video_recorded_at,
        this.video_archived_at,
      ]);
      return result.insertId; // 추가된 행의 Idx(순번) 반환
    } catch (error) {
      throw error;
    }
  }

  // 특정 영상 정보를 조회하는 정적 메소드
  static async findById(videoIdx) {
    try {
      const [rows] = await db.query(`SELECT * FROM cms_videos WHERE video_idx = ?`, [videoIdx]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // 영상 정보를 업데이트하는 메소드
  async update(videoIdx) {
    try {
      const [result] = await db.query(`UPDATE cms_videos SET video_name = ?, video_path = ?, video_recorded_at = ?, video_archived_at = ? WHERE video_idx = ?`, [
        this.video_name,
        this.video_path,
        this.video_recorded_at,
        this.video_archived_at,
        videoIdx,
      ]);
      return result.affectedRows; // 영향을 받은 행의 수 반환
    } catch (error) {
      throw error;
    }
  }

  // 영상 정보를 삭제하는 정적 메소드
  static async delete(videoIdx) {
    try {
      const [result] = await db.query(`DELETE FROM cms_videos WHERE video_idx = ?`, [videoIdx]);
      return result.affectedRows; // 영향을 받은 행의 수 반환
    } catch (error) {
      throw error;
    }
  }
}
// 비디오 추가: INSERT INTO cms_videos (video_name, video_path) VALUES (?, ?);
// 비디오 정보 조회: SELECT * FROM cms_videos WHERE video_idx = ?;
// 비디오 삭제: DELETE FROM cms_videos WHERE video_idx = ?;
module.exports = Video;
