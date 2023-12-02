const db = require('../config/dbConnMysql');
const { domainQueries } = require('./_Queries');

const getDomain = async (domain) => {
  try {
    [results] = await db.query(domainQueries.getDomainQuery, [domain]);
    return results;
  } catch (err) {
    throw err;
  }
};

const createDomain = async (
  url_addr,
  url_status,
  business_bno,
  url_archived_at,
  url_period_at
) => {
  try {
    [results] = await db.query(domainQueries.createDomainQuery, [
      url_addr,
      url_status,
      business_bno,
      url_archived_at,
      url_period_at,
    ]);
    return results;
  } catch (err) {
    throw err;
  }
};

const updateDomain = async (
  url_idx,
  url_addr,
  url_status,
  business_bno,
  url_archived_at,
  url_period_at
) => {
  try {
    [results] = await db.query(domainQueries.updateDomainQuery, [
      url_addr,
      url_status,
      business_bno,
      url_archived_at,
      url_period_at,
      url_idx,
    ]);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getDomain,
  createDomain,
  updateDomain,
};
