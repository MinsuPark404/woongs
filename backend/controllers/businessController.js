const asyncHandler = require('express-async-handler');
const businessModel = require('../models/businessModel');

// @어린이집 등록
// @Endpoint POST /api/businesses
// @access admin_s
const createBusiness = asyncHandler(async (req, res) => {
  try {
    const businessData = req.body;
    console.log(businessData);
    const createdBusiness = await businessModel.createBusiness(businessData);
    return res.status(201).json({
      message: '사업체 생성 성공',
      business: createdBusiness,
    });
  } catch (error) {
    console.error('사업체 생성 실패', error);
    return res
      .status(500)
      .json({ message: '사업체 생성 중 오류가 발생했습니다.' });
  }
});

// @어린이집 정보 수정
// @Endpoint PUT /api/businesses/:id
// @access admin_s
const updateBusiness = asyncHandler(async (req, res) => {
  try {
    const businessId = req.params.id;
    const businessData = req.body;
    const updatedBusiness = await businessModel.updateBusiness(
      businessId,
      businessData
    );
    return res.status(200).json({
      message: '사업체 정보 수정 성공',
      business: updatedBusiness,
    });
  } catch (error) {
    console.error('사업체 정보 수정 실패', error);
    return res
      .status(500)
      .json({ message: '사업체 정보 수정 중 오류가 발생했습니다.' });
  }
});

// @어린이집 정보 삭제
// @Endpoint DELETE /api/businesses/:id
// @access admin_s
const deleteBusiness = asyncHandler(async (req, res) => {
  try {
    const businessId = req.params.id;
    const deletedBusiness = await businessModel.deleteBusiness(businessId);
    return res.status(200).json({
      message: '사업체 정보 삭제 성공',
      business: deletedBusiness,
    });
  } catch (error) {
    console.error('사업체 정보 삭제 실패', error);
    return res
      .status(500)
      .json({ message: '사업체 정보 삭제 중 오류가 발생했습니다.' });
  }
});

module.exports = {
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
