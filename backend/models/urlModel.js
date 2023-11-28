const db = require('../config/dbConnMysql');
const { urlQueries } = require('./_Queries');

const createUrl = async (urlData) => {
  try {
    const results = await db.query(urlQueries.createUrlQuery, [
      urlData.url_addr,
      urlData.url_status,
      urlData.business_idx,
      urlData.url_archived_at,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getUrlById = async (urlId) => {
  try {
    const results = await db.query(urlQueries.getUrlByIdQuery, [urlId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const updateUrl = async (urlId, urlData) => {
  try {
    const results = await db.query(urlQueries.updateUrlQuery, [
      urlData.url_addr,
      urlData.url_status,
      urlData.business_idx,
      urlData.url_archived_at,
      urlId,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteUrl = async (urlId) => {
  try {
    const results = await db.query(urlQueries.deleteUrlQuery, [urlId]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUrl,
  getUrlById,
  updateUrl,
  deleteUrl,
};
