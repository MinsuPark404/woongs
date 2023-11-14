const asyncHandler = require('express-async-handler');
const contentsModel = require('../models/contentsModel');

// 컨텐츠 생성
const createContent = asyncHandler(async (req, res) => {
  try {
    const contentData = req.body;
    const result = await contentsModel.createContent(contentData);
    res.status(201).json({
      message: '컨텐츠 생성 성공',
      contentId: result.insertId,
    });
  } catch (error) {
    console.error('컨텐츠 생성 중 오류:', error);
    res.status(500).json({ message: '컨텐츠 생성 중에 오류 발생' });
  }
});

// 특정 컨텐츠 조회
// 추후 컨텐츠 늘어날 경우에 사용
// const getContentById = asyncHandler(async (req, res) => {
//   try {
//     const contentId = req.params.id;
//     const result = await contentsModel.getContentById(contentId);
//     if (result.length === 0) {
//       return res.status(404).json({ message: '컨텐츠를 찾을 수 없음' });
//     }
//     res.status(200).json({ content: result[0] });
//   } catch (error) {
//     console.error('컨텐츠 ID 오류:', error);
//     res.status(500).json({ message: '컨텐츠를 찾던 중 오류 발생' });
//   }
// });

// 컨텐츠 업데이트
const updateContent = asyncHandler(async (req, res) => {
  try {
    const contentId = req.params.id;
    const contentData = req.body;
    const result = await contentsModel.updateContent(contentId, contentData);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: '컨텐츠를 찾을 수 없거나 업데이트가 필요 없습니다' });
    }
    res.status(200).json({ message: '컨텐츠가 성공적으로 업데이트되었습니다' });
  } catch (error) {
    console.error('컨텐츠 업데이트 오류:', error);
    res.status(500).json({ message: '컨텐츠 업데이트 중 오류 발생' });
  }
});

// 컨텐츠 삭제
const deleteContent = asyncHandler(async (req, res) => {
  try {
    const contentId = req.params.id;
    const result = await contentsModel.deleteContent(contentId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다' });
    }
    res.status(200).json({ message: '컨텐츠가 성공적으로 삭제되었습니다' });
  } catch (error) {
    console.error('컨텐츠 삭제 오류:', error);
    res.status(500).json({ message: '컨텐츠 삭제 중 오류 발생' });
  }
});

module.exports = {
  createContent,
  // getContentById,
  updateContent,
  deleteContent,
};
