// videosModel.js
const db = require('../config/dbConnMysql');

const createVideo = async (videoData) => {
  try {
    console.log('videoData:', videoData);
    const {
      video_name,
      video_path,
      video_recoded_at,
      video_archived_at,
      business_idx,
    } = videoData;
    const query =
      'INSERT INTO cms_videos (video_name, video_path, video_recoded_at, video_archived_at, video_created_at, business_idx) VALUES (?, ?, ?, ?, NOW(),?)';
    const results = await db.query(query, [
      video_name,
      video_path,
      video_recoded_at,
      video_archived_at,
      business_idx,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAllVideos = async (businessBno) => {
  try {
    let query;
    let queryParams;
    if (businessBno) {
      // 관리자: business_bno 값이 있는 경우, 해당 비즈니스의 비디오만 조회
      query = `SELECT video_idx, video_name, video_path, 
               DATE_FORMAT(CONVERT_TZ(video_recoded_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS video_recoded_at, 
               DATE_FORMAT(CONVERT_TZ(video_archived_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS video_archived_at, 
               DATE_FORMAT(CONVERT_TZ(video_created_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS video_created_at, 
               business_bno 
               FROM cms_videos
               WHERE business_bno = ?`;
      queryParams = [businessBno];
    } else {
      // 슈퍼관리자: business_bno 값이 없는 경우, 전체 비디오 조회
      query = `SELECT video_idx, video_name, video_path, 
               DATE_FORMAT(CONVERT_TZ(video_recoded_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS video_recoded_at, 
               DATE_FORMAT(CONVERT_TZ(video_archived_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS video_archived_at, 
               DATE_FORMAT(CONVERT_TZ(video_created_at, '+00:00', '+09:00'), '%Y-%m-%d %H:%i:%s') AS video_created_at, 
               business_bno 
               FROM cms_videos`;
      queryParams = [];
    }

    const [results] = await db.query(query, queryParams);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAllVideosByBusinessIdx = async (businessIdx) => {
  try {
    const query = 'SELECT * FROM cms_videos WHERE business_idx = ?';
    const videos = await db.query(query, [businessIdx]);
    return videos;
  } catch (error) {
    console.error('Get All Videos By Business Idx Error:', error);
    throw error;
  }
};

const getVideoById = async (videoId) => {
  try {
    const query = 'SELECT * FROM cms_videos WHERE video_idx = ?';
    const results = await db.query(query, [videoId]);
    return results;
  } catch (error) {
    throw error;
  }
};

// const updateVideo = async (videoId, videoData) => {
//   try {
//     const query =
//       'UPDATE cms_videos SET video_name = ?, video_path = ?, video_recoded_at = ?, video_archived_at = ?, video_created_at = ? WHERE video_idx = ?';
//     const results = await db.query(query, [
//       videoData.video_name,
//       videoData.video_path,
//       videoData.video_recoded_at,
//       videoData.video_archived_at,
//       videoData.video_created_at,
//       videoId,
//     ]);
//     return results;
//   } catch (error) {
//     throw error;
//   }
// };

const deleteVideo = async (videoId) => {
  try {
    const query = 'DELETE FROM cms_videos WHERE video_idx = ?';
    const results = await db.query(query, [videoId]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createVideo,
  getVideoById,
  getAllVideos,
  getAllVideosByBusinessIdx,
  deleteVideo,
};
