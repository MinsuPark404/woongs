const db = require('../config/dbConnMysql');
const { contentsQueries } = require('./_Queries');

const createContent = async (businessBno, contentData) => {
  try {
    const results = await db.query(contentsQueries.createContentQuery, [
      JSON.stringify(contentData.content_detail),
      businessBno,
      contentData.content_created_at,
      contentData.content_updated_at,
    ]);
    return results;
  } catch (error) {
    console.error('Create Content Error:', error);
    throw error;
  }
};

const updateContent = async (businessBno, contentId, contentData) => {
  try {
    const results = await db.query(contentsQueries.updateContentQuery, [
      JSON.stringify(contentData.content_detail),
      contentData.content_updated_at,
      contentId,
      businessBno,
    ]);
    return results;
  } catch (error) {
    console.error('Update Content Error:', error);
    throw error;
  }
};

const deleteContent = async (businessBno, contentId) => {
  try {
    const results = await db.query(contentsQueries.deleteContentQuery, [
      contentId,
      businessBno,
    ]);
    return results;
  } catch (error) {
    console.error('Delete Content Error:', error);
    throw error;
  }
};

const createMenu = async (businessBno, menuData) => {
  try {
    const results = await db.query(contentsQueries.createMenuQuery, [
      JSON.stringify(menuData.menu_detail),
      businessBno,
      menuData.menu_created_at,
      menuData.menu_updated_at,
    ]);
    return results;
  } catch (error) {
    console.error('Create Menu Error:', error);
    throw error;
  }
};

const updateMenu = async (businessBno, menuId, menuData) => {
  try {
    const results = await db.query(contentsQueries.updateMenuQuery, [
      JSON.stringify(menuData.menu_detail),
      menuData.menu_updated_at,
      menuId,
      businessBno,
    ]);
    return results;
  } catch (error) {
    console.error('Update Menu Error:', error);
    throw error;
  }
};

const deleteMenu = async (businessBno, menuId) => {
  try {
    const results = await db.query(contentsQueries.deleteMenuQuery, [
      menuId,
      businessBno,
    ]);
    return results;
  } catch (error) {
    console.error('Delete Menu Error:', error);
    throw error;
  }
};

module.exports = {
  createContent,
  updateContent,
  deleteContent,
  createMenu,
  updateMenu,
  deleteMenu,
};
