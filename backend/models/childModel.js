const db = require('../config/dbConnMysql');
const { childQueries } = require('./_Queries');

const createChild = async (childData, business_bno) => {
  try {
    const { child_name, child_age, child_gender, child_class } = childData;
    const results = await db.query(childQueries.createChildQuery, [
      child_name,
      child_age,
      child_gender,
      child_class,
      business_bno,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getChild = async (business_bno) => {
  try {
    const [results] = await db.query(childQueries.getChildQuery, [
      business_bno,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const updateChild = async (
  childId,
  child_name,
  child_age,
  child_gender,
  child_class,
  business_bno
) => {
  try {
    const results = await db.query(childQueries.updateChildQuery, [
      child_name,
      child_age,
      child_gender,
      child_class,
      business_bno,
      childId,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteChild = async (childId) => {
  try {
    const [results] = await db.query(childQueries.deleteChildQuery, [childId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const recordAttendance = async (
  child_idx,
  attendance_status,
  business_bno,
  attendance_date,
  attendance_time
) => {
  try {
    const results = await db.query(childQueries.recordAttendanceQuery, [
      child_idx,
      attendance_status,
      business_bno,
      attendance_date,
      attendance_time,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAttendanceByDate = async (business_bno, attendance_date) => {
  try {
    const [results] = await db.query(childQueries.getAttendanceByDateQuery, [
      business_bno,
      attendance_date,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAttendanceByChild = async (child_idx) => {
  try {
    const [results] = await db.query(childQueries.getAttendanceByChildQuery, [
      child_idx,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createChild,
  getChild,
  updateChild,
  deleteChild,
  recordAttendance,
  getAttendanceByDate,
  getAttendanceByChild,
};
