const asyncHandler = require('express-async-handler');
const contentsModel = require('../models/contentsModel');

// 컨텐츠 생성
const createContent = asyncHandler(async (req, res) => {
  try {
    const contentData = req.body;
    const result = await contentsModel.createContent(contentData);
    res.status(201).json({
      message: 'Content successfully created',
      contentId: result.insertId,
    });
  } catch (error) {
    console.error('Create Content Error:', error);
    res.status(500).json({ message: 'Error creating content' });
  }
});

// 특정 컨텐츠 조회
// 추후 컨텐츠 늘어날 경우에 사용
// const getContentById = asyncHandler(async (req, res) => {
//   try {
//     const contentId = req.params.id;
//     const result = await contentsModel.getContentById(contentId);
//     if (result.length === 0) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     res.status(200).json({ content: result[0] });
//   } catch (error) {
//     console.error('Get Content By ID Error:', error);
//     res.status(500).json({ message: 'Error retrieving content' });
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
        .json({ message: 'Content not found or no update needed' });
    }
    res.status(200).json({ message: 'Content successfully updated' });
  } catch (error) {
    console.error('Update Content Error:', error);
    res.status(500).json({ message: 'Error updating content' });
  }
});

// 컨텐츠 삭제
const deleteContent = asyncHandler(async (req, res) => {
  try {
    const contentId = req.params.id;
    const result = await contentsModel.deleteContent(contentId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json({ message: 'Content successfully deleted' });
  } catch (error) {
    console.error('Delete Content Error:', error);
    res.status(500).json({ message: 'Error deleting content' });
  }
});

module.exports = {
  createContent,
  // getContentById,
  updateContent,
  deleteContent,
};
