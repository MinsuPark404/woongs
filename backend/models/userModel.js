const db = require('../config/dbConnMysql');
const { userQueries } = require('./_Queries');

const createUser = async (userData) => {
  try {
    const results = await db.query(userQueries.createUserQuery, [
      userData.user_email,
      userData.user_password,
      userData.user_name,
      userData.user_tel,
      userData.business_bno,
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
    const [results] = await db.query(userQueries.getUserByIdQuery, [userId]);
    return results;
  } catch (error) {
    console.error('Get User By ID Error:', error);
    throw error;
  }
};

// 직원 정보 조회
const getAllUsers = async (businessBno) => {
  try {
    const [results] = await db.query(userQueries.getAllUsersQuery, [
      businessBno,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const results = await db.query(userQueries.updateUserQuery, [
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
    const results = await db.query(userQueries.deleteUserQuery, [userId]);
    return results;
  } catch (error) {
    console.error('Delete User Error:', error);
    throw error;
  }
};

// 이메일를 통해 직원 조회
const findUserByEmail = async (user_email) => {
  try {
    console.log('user_email: ', user_email);
    const [results] = await db.query(userQueries.loginUserQuery, [user_email]);
    return results;
  } catch (error) {
    throw error;
  }
};

// 로그조회
const findLogs = async (bno) => {
  try {
    const results = await db.query(userQueries.findLogsQuery, [bno]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  findLogs,
};
