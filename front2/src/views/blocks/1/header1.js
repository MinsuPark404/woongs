const hbs = `

<!DOCTYPE html>


<html lang="ko">
<head>
	<title>템플릿유치원 V2</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="user-scalable=no, maximum-scale=1, minimum-scale=1.0 ,width=device-width">
	<meta name="title" content="템플릿유치원">
	<meta name="author" content="템플릿유치원">
	<meta name="keywords" content="템플릿유치원, 교육안내, 포토앨범, 알리마당">
	<meta name="subject" content="">
	<meta name="Description" content="템플릿유치원, 교육안내, 포토앨범, 알리마당">
	<meta name="classification" content="">

	<!-- 카카오톡 링크 보낼 때 뜨는 이미지와 텍스트 설정 -->
	<meta property="og:type" content="website">
	<meta property="og:title" content="템플릿유치원 V2"> <!-- 제목에 뜰 내용(굵은글씨) -->
	<meta property="og:url" content="http://www.ebikids.co.kr">	<!-- 링크걸릴주소 -->
	<meta property="og:description" content="템플릿유치원 V2, 교육안내, 포토앨범, 알리마당"> <!-- 제목아래쪽에 한줄 나오는 짧은 소개글 -->
	<meta property="og:image" content="/images/common/preview.png"> <!-- 썸네일이미지 경로 -->	

	<meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="하늘병아리 어린이집">
    <meta name="twitter:description" content="하늘병아리어린이집, 교육안내, 포토앨범, 알리마당">
    <meta name="twitter:image" content="/images/common/preview.jpg">
	
	<link rel="shortcut icon" href="../images/common/favicon.ico">
	<link rel="apple-touch-icon" href="../images/common/bookmark.png">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/reset.css" rel="stylesheet">
	<link type="text/css" href="../style/common.css" rel="stylesheet"><!-- 운영서버 CSS 파일사용 -->
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/common-ani.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/layerpopup.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/program.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/ebi.slider.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/layout.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/design.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/textRoll.css" rel="stylesheet">
	<link type="text/css" href="http://temp.ebikids.co.kr/v2_01a/style/main.css" rel="stylesheet">

	<script src="http://temp.ebikids.co.kr/v2_01a/script/jquery.1.12.0.min.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/jquery-ui.1.10.1.js"> </script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/jquery.cookie.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/jquery.easing.1.3.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/ebi.default.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/ebi.layerpopup.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/ebi.slider.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/ebi.textRoll.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/ebi.gnb.js"></script>
	<script src="http://temp.ebikids.co.kr/v2_01a/script/ebi.js"></script>
	
	<script src="http://temp.ebikids.co.kr/v2_01a/js/program.js"></script>
	<script type="text/javascript" src="../js/sns_auth_login.js"></script>

	<!-- push 전송 API -->
	<script type="text/javascript" src="http://temp.ebikids.co.kr/v2_common/pushProvider/sender.js"></script>

	<!--[if lt IE 10]>
		<link href="../style/ie.warning.css" rel="stylesheet" type="text/css">
	<![endif]-->
</head>

<body>



<!-- 컨텐츠 -->
<section class="main">

	
	
	<div class="noticeWrap">
		<div>
			<div class="noticeTit">
				<h3>알림마당</h3>
				<p>우리 원의 다양한 새로운 소식을 전해드립니다.</p>
			</div>
			<div class="noticeIcon">
				<a href="../community/notice_list.html?tn=bbs_notice">공지사항</a>
				<a href="../community/paper_list.html?tn=bbs_paper">가정통신</a>
				<a href="../community/food_list.html?tn=bbs_food">식단표</a>
			</div>
		</div>

		<ul>
	<li class="noticeList">
		<a href="../community/notice_list.html?tn=bbs_notice">봄철 인플루엔자 등 감염병 예방 및 교육을 실시하였습니다.</a>
		<span>2020.03.20</span>
	</li>
	<li class="noticeList">
		<a href="../community/notice_list.html?tn=bbs_notice">3월 영양교육을 하였어요</a>
		<span>2020.03.15</span>
	</li>
	<li class="foodList">
		<a href="../community/food_list.html?tn=bbs_food">2020년 3월달 식단표입니다.</a>
		<span>2020.03.02</span>
	</li>
	
</ul>
	</div>
	</section>
	
</body>
</html>
`;

const configTitle = {
  title: {
    type: "string",
    name: '제목',
  },
  titleColor: {
    type: "color",
    name: '제목 색상',
  },
  titleFontSize: {
    type: "string",
    name: '제목 글꼴 크기',
  },
  titleFontFamily: {
    type: "select",
    name: '제목 글꼴',
    options: [
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Times New Roman", value: "Times New Roman, serif" },
      { label: "Verdana", value: "Verdana, sans-serif" },
      { label: "Helvetica", value: "Helvetica, sans-serif" },
      { label: "Tahoma", value: "Tahoma, sans-serif" },
      { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
      { label: "Courier New", value: "Courier New, monospace" },
      // 필요에 따라 추가 폰트를 여기에 나열할 수 있습니다
    ]
  },

};

const configTagline = {
  tagline: {
    type: "string",
    name: '태그 라인',
  },
  taglineColor: {
    type: "color",
    name: '태그 라인 색상',
  },
  taglineFontSize: {
    type: "string",
    name: '태그 라인 글꼴 크기',
  },
  taglineFontFamily: {
    type: "select",
    name: '태그 글꼴',
    options: [
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Times New Roman", value: "Times New Roman, serif" },
      { label: "Verdana", value: "Verdana, sans-serif" },
      { label: "Helvetica", value: "Helvetica, sans-serif" },
      { label: "Tahoma", value: "Tahoma, sans-serif" },
      { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
      { label: "Courier New", value: "Courier New, monospace" },
      // 필요에 따라 추가 폰트를 여기에 나열할 수 있습니다
    ]
  },
};

const configLink = {
  link: {
    type: "string",
    name: '링크 텍스트',
  },
  linkColor: {
    type: "color",
    name: '링크 색상',
  },
  linkFontSize: {
    type: "string",
    name: '링크 글꼴 크기',
  },
  linkUrl: {
    type: "string",
    name: '링크 URL',
  },
  buttonBackgroundColor: {
    type: "color",
    name: '버튼 배경 색상',
  },
};

const configBackground = {
  backgroundImage: {
    type: "string",
    name: '배경 이미지 URL',
  },
};
const configLogo = {
  logoImage: {
    type: "string",
    name: '로고 이미지 URL',
  },
}

const block = {
  hbs,
  name: 'Enhanced Header #1',
  previewImageUrl: 'https://gamma.app/_next/static/media/Title-with-3-toggles.c0b5bbb9.svg',
  category: 'header',
  defaultData: {
    logoImage: "http://temp.ebikids.co.kr/v2_05a/images/common/logo-black.svg",
    title: "",
    tagline: "",
    link: "",
    linkUrl: "#",
  },
  config: {
    ...configLogo,
    ...configTitle,
    ...configTagline,
    ...configLink,
    ...configBackground
  }
};

export default block;