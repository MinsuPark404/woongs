// videosModel.js
const db = require('../config/dbConnMysql');

const createVideo = async (videoData) => {
  try {
    const query =
      'INSERT INTO cms_videos (video_name, video_path, video_recoded_at, video_archived_at, video_created_at) VALUES (?, ?, ?, ?, ?)';
    const results = await db.query(query, [
      videoData.video_name,
      videoData.video_path,
      videoData.video_recoded_at,
      videoData.video_archived_at,
      videoData.video_created_at,
    ]);
    return results;
  } catch (error) {
    console.error('Create Video Error:', error);
    throw error;
  }
};

const getVideoById = async (videoId) => {
  try {
    const query = 'SELECT * FROM cms_videos WHERE video_idx = ?';
    const results = await db.query(query, [videoId]);
    return results;
  } catch (error) {
    console.error('Get Video By ID Error:', error);
    throw error;
  }
};

const updateVideo = async (videoId, videoData) => {
  try {
    const query =
      'UPDATE cms_videos SET video_name = ?, video_path = ?, video_recoded_at = ?, video_archived_at = ?, video_created_at = ? WHERE video_idx = ?';
    const results = await db.query(query, [
      videoData.video_name,
      videoData.video_path,
      videoData.video_recoded_at,
      videoData.video_archived_at,
      videoData.video_created_at,
      videoId,
    ]);
    return results;
  } catch (error) {
    console.error('Update Video Error:', error);
    throw error;
  }
};

const deleteVideo = async (videoId) => {
  try {
    const query = 'DELETE FROM cms_videos WHERE video_idx = ?';
    const results = await db.query(query, [videoId]);
    return results;
  } catch (error) {
    console.error('Delete Video Error:', error);
    throw error;
  }
};

module.exports = {
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
};
