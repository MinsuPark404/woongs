const db = require('../config/dbConnMysql');
const { contentsQueries } = require('./_Queries');

const createContent = async (contentData) => {
  try {
    const results = await db.query(contentsQueries.createContentQuery, [
      JSON.stringify(contentData.content_detail),
      contentData.business_name,
      contentData.content_created_at,
      contentData.content_updated_at,
    ]);
    return results;
  } catch (error) {
    console.error('Create Content Error:', error);
    throw error;
  }
};

const getContentById = async (contentId) => {
  try {
    const results = await db.query(contentsQueries.getContentByIdQuery, [
      contentId,
    ]);
    return results;
  } catch (error) {
    console.error('Get Content By ID Error:', error);
    throw error;
  }
};

const updateContent = async (contentId, contentData) => {
  try {
    const results = await db.query(contentsQueries.updateContentQuery, [
      JSON.stringify(contentData.content_detail),
      contentData.business_name,
      contentData.content_updated_at,
      contentId,
    ]);
    return results;
  } catch (error) {
    console.error('Update Content Error:', error);
    throw error;
  }
};

const deleteContent = async (contentId) => {
  try {
    const results = await db.query(contentsQueries.deleteContentQuery, [
      contentId,
    ]);
    return results;
  } catch (error) {
    console.error('Delete Content Error:', error);
    throw error;
  }
};

module.exports = {
  createContent,
  getContentById,
  updateContent,
  deleteContent,
};
