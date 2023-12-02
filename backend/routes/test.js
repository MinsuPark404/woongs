router.get(
  '/list/:bno?',
  asyncHandler(async (req, res) => {
    console.log('세션 아이디:', req.session.admin);
    const businessBno = req.session.admin.bno;
    console.log(businessBno);
    try {
      const getPost = async (postId) => {
        try {
          const [results] = await db.query(boardQueries.getPost, [postId]);
          return results;
        } catch (err) {
          throw err;
        }
      };
      const result = await getPost(businessBno);
      res.status(200).json({
        status: 'success',
        data: {
          posts: result,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: '게시물 조회 중 오류가 발생했습니다',
      });
    }
  })
);
