const asyncHandler = require('express-async-handler');
const db = require('../config/dbConnMysql');
const domainModel = require('../models/domainModel');

const getDomain = asyncHandler(async (req, res) => {
  try {
    const result = await domainModel.getDomain();    
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
})

const createDomain = asyncHandler(async (req, res) => {
  try {
    const { url_addr, url_status, business_bno, url_created_at, url_period_at } = req.body;
    const result = await domainModel.createDomain(url_addr, url_status, business_bno, url_created_at, url_period_at);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
})

const updateDomain = asyncHandler(async (req, res) => {
  try {
    const { url_idx } = req.params;
    const { url_addr, url_status, business_bno, url_created_at, url_period_at } = req.body;
    
    const result = await domainModel.updateDomain(url_idx, url_addr, url_status, business_bno, url_created_at, url_period_at);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
})

module.exports = { getDomain, createDomain, updateDomain };