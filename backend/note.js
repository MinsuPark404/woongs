// @관리자 로그인
// @Endpoint POST /api/admins/login
// @access admin_s, admin_c
const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;

    // 이메일로 관리자 찾기
    const adminData = await adminModel.findAdminByEmail(admin_email);
    const admin = adminData.length > 0 ? adminData[0] : null;
    console.log('관리자 비밀번호', admin.admin_password);
    // 관리자가 존재하지 않거나, 비밀번호가 맞지 않으면 오류 메시지 전송
    if (!admin) {
      return res.status(401).json({ message: '인증 정보가 잘못되었습니다.' });
    }

    // bcrypt.compare로 입력된 비밀번호와 해시된 비밀번호 비교
    const passwordMatch = await bcrypt.compare(
      admin_password,
      admin.admin_password
    );

    // 비밀번호가 일치하면 로그인 성공 처리
    if (passwordMatch) {
      const token = jwt.sign(
        { id: admin.admin_idx },
        process.env.JWT_SECRET || '1234',
        {
          expiresIn: '1h',
        }
      );

      // 로그인 로그를 데이터베이스에 기록
      const loginLog = {
        business_name: admin.admin_business_name,
        admin_name: admin.admin_name,
        logged_at: new Date(), // 현재 시간
        log_info: '로그인 성공', // 로그인 성공 메시지
        log_ip: req.ip, // 사용자의 IP 주소
        logouted_at: null, // 로그아웃 시간은 로그인 시에는 null
        admin_idx: admin.admin_idx, // 이 부분은 관리자 식별자가 있는 경우에만 주석을 해제
      };
      await db.query('INSERT INTO cms_log SET ?', loginLog);

      // 로그인 성공 응답 전송
      return res.status(200).json({
        message: '로그인 성공!',
        admin: {
          id: admin.admin_idx,
          email: admin.admin_email,
          name: admin.admin_name,
          role: admin.admin_role,
          // 기타 필요한 관리자 정보를 여기에 추가
        },
        // 토큰과 관리자 정보 전송 (중요 정보는 제외하고 전송)
      });
    } else {
      // 비밀번호 불일치

      // 로그인 로그를 데이터베이스에 기록
      const loginLog = {
        business_name: admin.admin_business_name,
        admin_name: admin.admin_name,
        logged_at: new Date(), // 현재 시간
        log_info: '로그인 실패', // 로그인 성공 메시지
        log_ip: req.ip, // 사용자의 IP 주소
        logouted_at: null, // 로그아웃 시간은 로그인 시에는 null
        admin_idx: admin.admin_idx, // 이 부분은 관리자 식별자가 있는 경우에만 주석을 해제
      };
      await db.query('INSERT INTO cms_log SET ?', loginLog);

      return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
    }
  } catch (error) {
    // 에러 로깅
    console.error('Admin login failed:', error);
    return res
      .status(500)
      .json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
});
