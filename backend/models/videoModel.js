// videosModel.js
const db = require('../config/dbConnMysql');

const createVideo = async (videoData) => {
  try {
    console.log('videoData:', videoData);
    // console.log('query:', videoQueries);
    /*
    video_name (비디오 이름):
    설명: 비디오 파일의 이름입니다. 일반적으로 파일 업로드 시 사용되는 원본 파일명이나, 서버에서 파일을 저장할 때 생성한 새로운 이름일 수 있습니다.

    video_path (비디오 경로):
    설명: 서버에서 비디오 파일이 저장된 전체 경로입니다. 이 경로 정보는 서버에서 파일에 접근하기 위해 사용됩니다.

    video_recoded_at (촬영 날짜 및 시간):
    설명: 비디오가 촬영된 실제 날짜와 시간입니다. 이 정보는 CCTV에서 제공하거나, 파일 메타데이터에서 추출될 수 있습니다.

    video_archived_at (보관 만료일):
    설명: 비디오가 보관될 마지막 날짜입니다. 이 날짜가 지나면 비디오는 자동으로 아카이브되거나 삭제될 수 있습니다.

    business_idx (어린이집 식별자):
    설명: 해당 비디오가 어느 어린이집에 속하는지를 나타내는 고유 식별자입니다. 이는 어린이집을 구분하기 위한 용도로 사용됩니다.
    */
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

const getAllVideos = async () => {
  try {
    const query = 'SELECT * FROM cms_videos';
    const [results] = await db.query(query);
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
