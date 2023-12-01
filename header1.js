


const hbs = `


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
