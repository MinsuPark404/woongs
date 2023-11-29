


const hbs = `
<head>
<style>
        /* Adding custom style for header */
        header .head {
            position: relative; /* Position set to relative for z-index to take effect */
            z-index: 1000; /* High z-index value to ensure it's on top */
        }
		img.pc {
            width: 80px; /* Set your desired width */
            height: auto; /* Keeps the aspect ratio */
            /* Add more CSS properties as needed */
        }
		
    </style>
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
        <div class="slider" data-type="fade" data-speed="1000" data-time="4000" data-page="pageType1">
            <ul class="sliderObj">
                <li><img src="{{imageSrc1}}"></li>
                <li><img src="{{imageSrc2}}"></li>
                <li><img src="{{imageSrc3}}"></li>
            </ul>
<header>
	<div class="head">
		<h1>
			<a href="../main/main.html" title="템플릿유치원 V2">
				<img class="pc" src="{{logo}}" alt="템플릿유치원 V2 로고">
				<img class="mobile" src="{{logo}}" alt="템플릿유치원 V2 로고">
			</a>
		</h1>
		<div class="side pc">
		</div>		
		<aside class="mobile">
			<a class="gnbView" href="javascript:void(0);" title="전체메뉴"><div></div></a>			
		</aside>
	</div>
	
	<!-- // gnb -->
	<nav class="pc box">
	<div class="navbg pc">
		<div class="dep1"></div>
		<div class="dep2"></div>
	</div>
	<!-- orgH:1차메뉴 높이 / leftgap:왼쪽에서 여백 px,% 사용가능 -->
	<div class="gnb box" data-orgH="60" data-gap="130px" data-leftPos="">
		<ul>
			<li >
				<a href="/v2_01a/intro/intro.html?proc=greeting">우리원소개</a>
				<ul>
					<li ><a href="/v2_01a/intro/intro.html?proc=greeting">인사말</a></li>
					<li ><a href="/v2_01a/intro/intro.html?proc=history">운영방침 및 연혁</a></li>
					<li ><a href="/v2_01a/intro/intro.html?proc=teacher">선생님소개</a></li>
					<li ><a href="/v2_01a/intro/intro.html?proc=facility">시설안내</a></li>
					<li ><a href="/v2_01a/intro/intro.html?proc=location">찾아오시는 길</a></li>
				</ul>
			</li>
			<li >
				<a href="/v2_01a/edu/edu.html?proc=edu_01">교육안내</a>
				<ul>
					<li ><a href="/v2_01a/edu/edu.html?proc=edu_01">교육 프로그램</a></li>
					<li ><a href="/v2_01a/edu/edu.html?proc=edu_02">연간 교육계획</a></li>
					<li ><a href="/v2_01a/edu/edu.html?proc=edu_03">일일 활동계획</a></li>
					<li ><a href="/v2_01a/edu/edu.html?proc=edu_04">특별활동</a></li>
					<li ><a href="/v2_01a/edu/edu.html?proc=edu_05">교육행사</a></li>
				</ul>
			</li>
			<li >
				<a href="/v2_01a/photo/list.html?tn=bbs_photo">포토앨범</a>
				<ul>
					 <li > <a href="/v2_01a/photo/photo.html?tn=bbs_photo&mMenuNum=1&classId=1 ">다윗반</a></li> <li ><a href="/v2_01a/photo/photo.html?proc=history&tn=bbs_photo&mMenuNum=4" ">이전년도 앨범보기</a></li>					<!--
					<li ><a href="/v2_01a/photo/list.html">행복반</a></li>
					<li ><a href="/v2_01a/photo/list.html">달빛반</a></li>
					<li ><a href="/v2_01a/photo/list.html">기쁨반</a></li>
					<li ><a href="/v2_01a/photo/list.html">슬기반</a></li>
					<li ><a href="/v2_01a/photo/list.html">지혜반</a></li>
					<li ><a href="/v2_01a/photo/list.html">이전년도 앨범</a></li>
					-->
				</ul>
			</li>
			<li >
				<a href="/v2_01a/entrance/entrance_01.html">입학안내</a>
				<ul>
					<li ><a href="/v2_01a/entrance/entrance_01.html">모집요강</a></li>
					<li ><a href="/v2_01a/entrance/entrance_02.html?tn=bbs_entrance">입학상담</a></li>
				</ul>
			</li>
			<li >
				<a href="/v2_01a/community/notice.html?tn=bbs_notice">알림마당</a>
				<ul>
					<li ><a href="/v2_01a/community/notice.html?tn=bbs_notice">공지사항</a></li>
					<li ><a href="/v2_01a/community/paper.html?tn=bbs_paper">가정통신문</a></li>
					<li ><a href="/v2_01a/community/food.html?tn=bbs_food">식단표</a></li>
					<li ><a href="/v2_01a/community/schedule.html?tn=schedule_info">행사일정</a></li>
				</ul>
			</li>
			
					</ul>
	</div>
</nav><!-- //nav -->

<nav class="mobile box" data-arrow="right">
	<div class="closeWrap">
		<div class="base">

			
						<a href="javascript:void(0);" class="gnbClose"><div></div></a>
		</div>
	</div>
</nav>
<div class="gnbCover mobile"></div>

</header>
<div class="sliderTit">
	<h2>{{title}}<span>{{tagline}}</span></h2>
	
</div>
		<!-- 페이징 -->
		<div class="sliderPage"><div></div></div>
	</div>

	</section>
	
	</body>

`;

const block = {
	hbs,
	name: 'Simple Header #2',
	previewImageUrl: 'https://gamma.app/_next/static/media/Title-card.409d7081.svg',
	category: 'header',
	defaultData: {
		logo: "https://dnvefa72aowie.cloudfront.net/jobs/article/29555513/1677765497662/job-post-2878178089.jpeg?q=95&s=1440x1440&t=inside",
		title: "웅이네",
		tagline: "유치원",
		imageSrc1: "http://temp.ebikids.co.kr/v2_01a/images/main/main_bg.jpg",
		imageSrc2: "http://temp.ebikids.co.kr/v2_01a/images/main/main_bg2.jpg",
		imageSrc3: "http://temp.ebikids.co.kr/v2_01a/images/main/main_bg3.jpg",
	},
	config: {
		logo: {
			type: "string",
			name: 'logo',
		},
		title: {
			type: "string",
			name: 'Title',
		},
		tagline: {
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
