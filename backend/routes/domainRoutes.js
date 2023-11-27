const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const db = require('../config/dbConnMysql');

// 전체 도메인 정보 조회 라우트
router.get('/', asyncHandler(async (req, res) => {
  console.log('세션아이디2', req.sessionID);
  console.log('세션아이디2', req.session.admin);

  try {
    console.log('도메인 api 연결됨');
    const query = `
    SELECT url_addr,
       url_status,
       b.business_name,
       DATE_FORMAT(url_period_at, '%Y-%m-%d') AS url_period_at
    FROM cms_url u
    LEFT JOIN cms_businesses b ON u.business_bno = b.business_bno;
  `;
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}));

// 도메인 등록
router.post('/register', asyncHandler(async (req, res) => {
  try {
    const { url_addr, url_status, business_bno, url_created_at, url_period_at } = req.body;
    const query = `
      INSERT INTO cms_url (url_addr, url_status, business_bno, url_created_at, url_period_at)
      VALUES (?, ?, ?, ?, ?);
    `;
    const [results] = await db.query(query, [url_addr, url_status, business_bno, url_created_at, url_period_at]);
    console.log('result : ', results);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}));

// 도메인 수정
router.put('/:id', asyncHandler(async (req, res) => {
  try {
    const { url_idx } = req.params;
    const { url_addr, url_status, business_bno, url_created_at, url_period_at } = req.body;
    const query = `
      UPDATE cms_url
      SET url_addr = ?,
          url_status = ?,
          business_bno = ?,
          url_created_at = ?,
          url_period_at = ?
          WHERE url_idx = ?;`;
    const [results] = await db.query(query, [url_addr, url_status, business_bno, url_created_at, url_period_at, url_idx]);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}));

module.exports = router;
