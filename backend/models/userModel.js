const db = require('../config/dbConnMysql');

const createUser = async (userData) => {
  try {
    const query =
      'INSERT INTO cms_users (user_email, user_password, user_name, user_tel, user_role) VALUES (?, ?, ?, ?, ?)';
    const results = await db.query(query, [
      userData.user_email,
      userData.user_password,
      userData.user_name,
      userData.user_tel,
      userData.user_role,
    ]);
    return results;
  } catch (error) {
    console.error('Create User Error:', error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const query = 'SELECT * FROM cms_users WHERE user_idx = ?';
    const results = await db.query(query, [userId]);
    return results;
  } catch (error) {
    console.error('Get User By ID Error:', error);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const query =
      'UPDATE cms_users SET user_email = ?, user_password = ?, user_name = ?, user_tel = ?, user_role = ? WHERE user_idx = ?';
    const results = await db.query(query, [
      userData.user_email,
      userData.user_password,
      userData.user_name,
      userData.user_tel,
      userData.user_role,
      userId,
    ]);
    return results;
  } catch (error) {
    console.error('Update User Error:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const query = 'DELETE FROM cms_users WHERE user_idx = ?';
    const results = await db.query(query, [userId]);
    return results;
  } catch (error) {
    console.error('Delete User Error:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
