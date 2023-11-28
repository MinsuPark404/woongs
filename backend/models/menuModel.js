const db = require('../config/dbConnMysql');

const createMenu = async (menu_detail, business_bno) => {
  try {
    const results = await db.query(menuQueries.createMenuQuery, [menu_detail, business_bno]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getMenu = async (business_bno) => {
  try {
    const results = await db.query(menuQueries.getMenuQuery, [business_bno]);
    return results;
  } catch (error) {
    throw error;
  }
};

const updateMenu = async (menu_detail, business_bno) => {
  try {
    const results = await db.query(menuQueries.updateContentQuery, [menu_detail, business_bno]);
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteMenu = async (menuId) => {
  try {
    const results = await db.query(menuQueries.deleteContentQuery, [menuId]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
};
