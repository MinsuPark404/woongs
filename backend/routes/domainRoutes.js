const express = require('express');
const router = express.Router();
const db = require('../config/dbConnMysql');

// 전체 도메인 정보 조회 라우트
router.get('/', async (req, res) => {
  try {
    console.log("도메인 api 연결됨");
    const query = `
      SELECT cms_url.*, cms_businesses.*
      FROM cms_url
      LEFT JOIN cms_businesses ON cms_url.business_bno = cms_businesses.business_bno;
    `;
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// 도메인 등록
router.post('/', async (req, res) => {
  try {
    const { url_addr, url_status ,business_bno, url_archived_at, url_period } = req.body;
    const query = `
      INSERT INTO cms_url (url_addr, url_status, business_bno, url_archived_at, url_period)
      VALUES (?, ?, ?, ?, ?);
    `;

    
    const [results] = await db.query(query, [url_addr, url_status, business_bno, url_archived_at, url_period]);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
})

module.exports = router;