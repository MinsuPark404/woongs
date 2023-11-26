// middleware/auth
const verifyAdminAccess = (req, res, next) => {
  const sessionData = req.session;
  const role = sessionData.admin.role;
  const bno = sessionData.admin.bno;
  console.log('세션데이터: ', role, bno);

  // // 권한이 '슈퍼관리자'가 아니라면
  // if (adminRole !== '슈퍼관리자') {
  //   // 해당 어린이집의 business_bno와 세션의 business_bno가 일치하는지 확인
  //   if (req.body.business_bno !== adminBusinessBno) {
  //     console.log(`권한 실패`);
  //     return res.status(403).json({ message: '권한이 없습니다.' });
  //   }
  // }
  console.log(`권한 성공`);
  next();
};

module.exports = verifyAdminAccess;
