const express = require('express');
const router = express.Router();
const {
  createVideo,
  getVideo,
  getAllVideos,
  deleteVideo,
} = require('../controllers/videoController');

// 비디오 업로드
router.post('/', createVideo);

// 비디오 목록 조회
router.get('/', getAllVideos);

// 특정 비디오 조회
router.get('/:id', getVideo);

// 비디오 삭제
router.delete('/:id', deleteVideo);

module.exports = router;
