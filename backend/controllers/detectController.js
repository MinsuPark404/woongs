const asyncHandler = require('express-async-handler');
const detectModel = require('../models/detectModel');

// 탐지 조회 컨트롤러
const getDetect = asyncHandler(async (req, res) => {
  try {
    const result = await detectModel.getDetect();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = { getDetect };
