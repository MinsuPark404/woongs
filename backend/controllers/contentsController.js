const asyncHandler = require('express-async-handler');
const contentsModel = require('../models/contentsModel');

// 컨텐츠 생성
const createContent = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    const businessBno = req.params.business_bno;
    const contentData = { ...req.body, businessBno }; // 사업자 번호를 컨텐츠 데이터에 추가
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

// 컨텐츠 업데이트
const updateContent = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    const businessBno = req.params.business_bno;
    const contentId = req.params.contentId;
    const contentData = { ...req.body, businessBno, contentId }; // 사업자 번호와 컨텐츠 ID 추가
    const result = await contentsModel.updateContent(contentData);
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
    console.log('세션아이디', req.sessionID);
    const businessBno = req.params.business_bno;
    const contentId = req.params.contentId;
    const result = await contentsModel.deleteContent(businessBno, contentId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다' });
    }
    res.status(200).json({ message: '컨텐츠가 성공적으로 삭제되었습니다' });
  } catch (error) {
    console.error('컨텐츠 삭제 오류:', error);
    res.status(500).json({ message: '컨텐츠 삭제 중 오류 발생' });
  }
});

// 메뉴 생성
const createMenu = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    const businessBno = req.params.business_bno;
    const menuData = { ...req.body, businessBno }; // 사업자 번호를 메뉴 데이터에 추가
    const result = await contentsModel.createMenu(menuData);
    res.status(201).json({
      message: '메뉴 생성 성공',
      menuId: result.insertId,
    });
  } catch (error) {
    console.error('메뉴 생성 중 오류:', error);
    res.status(500).json({ message: '메뉴 생성 중 오류 발생' });
  }
});

// 메뉴 업데이트
const updateMenu = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    const businessBno = req.params.business_bno;
    const menuId = req.params.menuId;
    const menuData = { ...req.body, businessBno, menuId }; // 사업자 번호와 메뉴 ID 추가
    const result = await contentsModel.updateMenu(menuData);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: '메뉴를 찾을 수 없거나 업데이트가 필요 없습니다' });
    }
    res.status(200).json({ message: '메뉴가 성공적으로 업데이트되었습니다' });
  } catch (error) {
    console.error('메뉴 업데이트 오류:', error);
    res.status(500).json({ message: '메뉴 업데이트 중 오류 발생' });
  }
});

// 메뉴 삭제
const deleteMenu = asyncHandler(async (req, res) => {
  try {
    console.log('세션아이디', req.sessionID);
    const businessBno = req.params.business_bno;
    const menuId = req.params.menuId;
    const result = await contentsModel.deleteMenu(businessBno, menuId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '메뉴를 찾을 수 없습니다' });
    }
    res.status(200).json({ message: '메뉴가 성공적으로 삭제되었습니다' });
  } catch (error) {
    console.error('메뉴 삭제 오류:', error);
    res.status(500).json({ message: '메뉴 삭제 중 오류 발생' });
  }
});

module.exports = {
  createContent,
  updateContent,
  deleteContent,
  createMenu,
  updateMenu,
  deleteMenu,
  // getMenu,
  // getContent
};
