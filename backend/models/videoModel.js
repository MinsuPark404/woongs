// videosModel.js
const db = require('../config/dbConnMysql');
const {videoQueries} = require('./_Queries');

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
    const results = await db.query(videoQueries.createVideoQuery, [
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
      queryParams = [businessBno];
      const [results] = await db.query(videoQueries.getVideos1, queryParams);
      return results;
    } else {
      // 슈퍼관리자: business_bno 값이 없는 경우, 전체 비디오 조회
      queryParams = [];
      const [results] = await db.query(videoQueries.getVideos2, queryParams);
      return results;
    }
  } catch (error) {
    throw error;
  }
};

const getAllVideosByBusinessIdx = async (businessIdx) => {
  try {
    const videos = await db.query(videoQueries.getVideosBusinessQuery, [businessIdx]);
    return videos;
  } catch (error) {
    throw error;
  }
};

const getVideoById = async (videoId) => {
  try {
    const results = await db.query(videoQueries.getVideosIdQuery, [videoId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteVideo = async (videoId) => {
  try {
    const results = await db.query(videoQueries.deleteVideoQuery, [videoId]);
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
