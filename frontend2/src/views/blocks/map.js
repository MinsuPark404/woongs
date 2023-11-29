


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

	
	
	<div class="mapWrap">
		<div class="mapTit">
			<h4>{{title}}<span></span></h4>
			<p>
				{{tagline1}}<br>
				전화 : {{tagline2}}<br>
				팩스 : {{tagline3}}
			</p>
		</div>
	
		<!-- * 카카오맵 - 지도퍼가기 -->
		<!-- 1. 지도 노드 -->
		<div id="daumRoughmapContainer1585105260906" class="root_daum_roughmap root_daum_roughmap_landing"></div>
		
		<!--
			2. 설치 스크립트
			* 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
		-->
		<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
		
		<!-- 3. 실행 스크립트 -->
		<script charset="UTF-8">
			new daum.roughmap.Lander({
				"timestamp" : "1585105260906",
				"key" : "xnpz",
				"mapWidth" : "",
				"mapHeight" : "600"
			}).render();
		</script>

	</div>
	
</section><!-- //main -->


</body>
</html>
`;

const block = {
	hbs,
	name: 'map #1',
	previewImageUrl: 'https://devtalk.kakao.com/uploads/default/original/2X/9/95e25f6d26f1b8260fce49b4c1dc041627507d36.PNG',
	category: 'photo',
	defaultData: {
		
		title: "웅이네",
		tagline1: "웅",
        tagline2: "이",
        tagline3: "네",
		
	},
	config: {
		

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
       
	}
};

export default block;
