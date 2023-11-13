// @관리자 목록 조회
// @Endpoint POST /api/admins/list
// @access admin_s
const businessList = asyncHandler(async (req, res) => {
  const [admins] = await db.query('SELECT * FROM cms_admins');
  res.status(200).json(admins);
});

await adminModel.getAlladmins;
