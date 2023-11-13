// middleware/auth.js
const verifyAdminAccess = (req, res, next) => {
  if (!req.session.admin || req.session.admin.role !== 'admin_s') {
    return res.status(403).json({ message: '권한이 없습니다.' });
  }
  next();
};

module.exports = verifyAdminAccess;
