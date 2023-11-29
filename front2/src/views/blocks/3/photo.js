


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

	
	
	<div class="photoWrap">
		<h3>포토앨범</h3>
		<p>{{title}}</p>
			<div class="insertBg ratioH" data-ratioh="100">
<a href="{{imageSrc1}}">
	<dl>
		<dt class="img">
			<img src="{{imageSrc1}}"" alt="">
		</dt>
		<dd>{{tagline1}}<span>2020.03.25</span></dd>
	</dl>
</a>
<a href="{{imageSrc2}}">
	<dl>
		<dt class="img">
			<img src="{{imageSrc2}}"" alt="">
		</dt>
		<dd>{{tagline2}}<span>2020.03.20</span></dd>
	</dl>
</a>
<a href="{{imageSrc3}}">
	<dl>
		<dt class="img">
			<img src="{{imageSrc3}}"" alt="">
		</dt>
		<dd>{{tagline3}}<span>2020.03.18</span></dd>
	</dl>
</a>
</div>
	
	</div>
	
	
	
	
</section><!-- //main -->




</body>
</html>
`;

const block = {
	hbs,
	name: 'photo #1',
	previewImageUrl: 'https://gamma.app/_next/static/media/ImagesWithTextIcons.85edfaa6.svg',
	category: 'gallery',
	defaultData: {
		
		title: "웅이네",
		tagline1: "웅",
        tagline2: "이",
        tagline3: "네",
		imageSrc1: "http://temp.ebikids.co.kr/v2_01a/images/main/main_bg.jpg",
		imageSrc2: "http://temp.ebikids.co.kr/v2_01a/images/main/main_bg2.jpg",
		imageSrc3: "http://temp.ebikids.co.kr/v2_01a/images/main/main_bg3.jpg",
	},
	config: {
		
		title: {
			type: "string",
			name: 'Title',
		},
		tagline1: {
			type: "string",
			name: 'Tag Line',
		},
        tagline2: {
			type: "string",
			name: 'Tag Line',
		},
        tagline3: {
			type: "string",
			name: 'Tag Line',
		},
		imageSrc1: {
			type: "string",
			name: 'Image Source 1',
		},
		imageSrc2: {
			type: "string",
			name: 'Image Source 2',
		},
		imageSrc3: {
			type: "string",
			name: 'Image Source 3',
		},
	}
};

export default block;
