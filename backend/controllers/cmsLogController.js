const asyncHandler = require('express-async-handler');
const cmsLogModel = require('../models/cmsLogModel');

// 사용자가 로그인을 하면 jwt를 통하여 id를 조회
// 로그인

const createLoginLog = asyncHandler(async (req, res) => {
  try {
    const { log_info, log_ip } = req.body;
    // 입력값 검증 로직 추가 가능
    const result = await cmsLogModel.create(log_info, log_ip);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const LoginLogList = asyncHandler(async (req, res) => {
  try {
    const cms_log_idx = req.params.id;
    const result = await cmsLogModel.findById(cms_log_idx);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const LoginLogListAll = asyncHandler(async (req, res) => {
  try {
    const result = await cmsLogModel.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { createLoginLog, LoginLogList, LoginLogListAll };
