const db = require('../config/dbConnMysql');

const createUrl = async (urlData) => {
  try {
    const query =
      'INSERT INTO cms_url (url_addr, url_status, business_idx, url_archived_at) VALUES (?, ?, ?, ?)';
    const results = await db.query(query, [
      urlData.url_addr,
      urlData.url_status,
      urlData.business_idx,
      urlData.url_archived_at,
    ]);
    return results;
  } catch (error) {
    console.error('Create URL Error:', error);
    throw error;
  }
};

const getUrlById = async (urlId) => {
  try {
    const query = 'SELECT * FROM cms_url WHERE url_idx = ?';
    const results = await db.query(query, [urlId]);
    return results;
  } catch (error) {
    console.error('Get URL By ID Error:', error);
    throw error;
  }
};

const updateUrl = async (urlId, urlData) => {
  try {
    const query =
      'UPDATE cms_url SET url_addr = ?, url_status = ?, business_idx = ?, url_archived_at = ? WHERE url_idx = ?';
    const results = await db.query(query, [
      urlData.url_addr,
      urlData.url_status,
      urlData.business_idx,
      urlData.url_archived_at,
      urlId,
    ]);
    return results;
  } catch (error) {
    console.error('Update URL Error:', error);
    throw error;
  }
};

const deleteUrl = async (urlId) => {
  try {
    const query = 'DELETE FROM cms_url WHERE url_idx = ?';
    const results = await db.query(query, [urlId]);
    return results;
  } catch (error) {
    console.error('Delete URL Error:', error);
    throw error;
  }
};

module.exports = {
  createUrl,
  getUrlById,
  updateUrl,
  deleteUrl,
};
