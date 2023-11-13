const db = require('../config/dbConnMysql');

const createMenu = async (menuData) => {
  try {
    const query =
      'INSERT INTO cms_menu (menu_detail, menu_created_at, menu_updated_at) VALUES (?, ?, ?)';
    const results = await db.query(query, [
      JSON.stringify(menuData.menu_detail),
      menuData.menu_created_at,
      menuData.menu_updated_at,
    ]);
    return results;
  } catch (error) {
    console.error('Create Menu Error:', error);
    throw error;
  }
};

const getMenuById = async (menuId) => {
  try {
    const query = 'SELECT * FROM cms_menu WHERE menu_idx = ?';
    const results = await db.query(query, [menuId]);
    return results;
  } catch (error) {
    console.error('Get Menu By ID Error:', error);
    throw error;
  }
};

const updateMenu = async (menuId, menuData) => {
  try {
    const query =
      'UPDATE cms_menu SET menu_detail = ?, menu_updated_at = ? WHERE menu_idx = ?';
    const results = await db.query(query, [
      JSON.stringify(menuData.menu_detail),
      menuData.menu_updated_at,
      menuId,
    ]);
    return results;
  } catch (error) {
    console.error('Update Menu Error:', error);
    throw error;
  }
};

const deleteMenu = async (menuId) => {
  try {
    const query = 'DELETE FROM cms_menu WHERE menu_idx = ?';
    const results = await db.query(query, [menuId]);
    return results;
  } catch (error) {
    console.error('Delete Menu Error:', error);
    throw error;
  }
};

module.exports = {
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
};
