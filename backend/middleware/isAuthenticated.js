// 인증 미들웨어 정의
function isAuthenticated(req, res, next) {
  // 로그인 화면과 API 경로에 대한 예외 처리
  if (req.path === '/' || req.path.startsWith('/api/admins/login')) {
    return next();
  }
  if (!req.session.admin) {
    return res.status(403).json({ error: '로그인이 필요합니다.' });
  }
  next();
}

module.exports = isAuthenticated;