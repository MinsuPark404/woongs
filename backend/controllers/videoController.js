const asyncHandler = require('express-async-handler');
const videoModel = require('../models/videoModel');

// 비디오 데이터 업로드
// @Endpoint POST /api/videos
// @access admin_s
const createVideo = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    // 클라이언트(플라스크측) -> 서버로 비디오 데이터 전송
    const videoData = req.body;
    // console.log(videoData);
    await videoModel.createVideo(videoData);
    res.status(201).json({ message: '비디오 등록 성공' });
  } catch (error) {
    res.status(500).json({ message: '비디오 등록 중 에러 발생' });
  }
});

// 비디오 전체 조회
// @Endpoint GET /api/videos
// @access admin_s
const getAllVideos = asyncHandler(async (req, res) => {
  const businessBno = req.session.admin.bno
  try {
    console.log('비디오api 사업자번호:', businessBno);
    const videos = await videoModel.getAllVideos(businessBno);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: '비디오를 찾는 중에 오류가 발생' });
  }
});

// 특정 비디오 조회
// @Endpoint GET /api/videos/:id
// @access admin_s
const getVideo = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    let videos;
    // 슈퍼관리자인 경우 모든 비디오 조회
    if (req.user.role === 'admin_s') {
      videos = await videoModel.getAllVideos();
    } else {
      // 일반 원장인 경우 해당 어린이집의 비디오만 조회
      const businessIdx = req.user.business_idx;
      videos = await videoModel.getAllVideosByBusinessIdx(businessIdx);
    }
    if (videos.length > 0) {
      res.status(200).json(videos);
    } else {
      res.status(404).json({ message: '비디오를 찾을 수 없습니다' });
    }
  } catch (error) {
    res.status(500).json({ message: '비디오를 찾는 중에 오류가 발생' });
  }
});

// 비디오 데이터 삭제
// @Endpoint DELETE /api/videos/:id
// @access admin_s
const deleteVideo = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    const videoId = req.params.id;
    await videoModel.deleteVideo(videoId);
    res.status(200).json({ message: '비디오 삭제 성공' });
  } catch (error) {
    res.status(500).json({ message: '비디오 삭제 중에 오류가 발생' });
  }
});

// 비디오 이상탐지 알림
// @Endpoint POST /api/videos
// @access admin_s

module.exports = { createVideo, getVideo, getAllVideos, deleteVideo };
