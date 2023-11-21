// middleware/auth
const verifyAdminAccess = (req, res, next) => {
  // console.log('관리자 권한', req.session.admin.role);
  if (req.session.admin.role !== 'admin_s') {
    console.log(`권한 실패`);
    return res.status(403).json({ message: '권한이 없습니다.' });
  }
  console.log(`권한 성공`);
  next();
};

module.exports = verifyAdminAccess;
