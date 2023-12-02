


const hbs = `
<html lang="ko">
<style>
header {
  height: 80%;
	position: relative;
	z-index: 1;
  }
  
header h1 {
    position: absolute;
	  
    top: 0%;
    left: 0%;
}
header h2 {
    position: absolute;
    top: 50%;
    left: 0;
}

header h1 img {
    width: 200px;
    height: auto;
    align-items: center;
    
}
.logo {
  font-family: 'Gamja Flower', sans-serif;
  font-size: 50px;
}
.login {
  position: absolute;
  top: 10%;
  right: 5%;
}
.login ul {
  display: flex;
  justify-content: space-around; /* 버튼 간의 간격을 균등하게 설정합니다. */
  list-style-type: none; /* 기본 리스트 스타일을 제거합니다. */
  padding: 0; /* 패딩을 제거합니다. */
}

.login ul li {
  margin: 0 10px; /* 리스트 항목 주위에 마진을 추가합니다. */
}

.login ul li a {
  text-decoration: none; /* 링크의 기본 밑줄 스타일을 제거합니다. */
  color: #000; /* 링크의 색상을 검은색으로 설정합니다. */
  font-size: 18px; /* 폰트 크기를 조정합니다. */
  font-weight: bold; /* 폰트를 굵게 설정합니다. */
  padding: 10px 20px; /* 패딩을 추가하여 버튼처럼 보이게 합니다. */
  border: 1px solid #000; /* 테두리를 추가합니다. */
  border-radius: 5px; /* 테두리를 둥글게 만듭니다. */
  transition: background-color 0.3s ease; /* 배경색 변경 애니메이션을 추가합니다. */
}

.login ul li a:hover {
  background-color: #000; /* 마우스를 올렸을 때의 배경색을 설정합니다. */
  color: #fff; /* 마우스를 올렸을 때의 텍스트 색상을 설정합니다. */
}

nav {
	position: absolute;
	top: 25%;
	left: 50%;
	transform: translateX(-50%);
	width:100%;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.05);
  }
  
  nav ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
  }
  
  nav ul li {
	position: relative;
	display: flex;
  }
  
  nav ul li a {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 30px 40px;
	text-decoration: none;
	color: black;
	font-size: 18px;
	font-weight: 600;
	transition: color 0.3s, background 0.3s;
  }
  
  nav ul ul {
	position: absolute;
	top: 100%;
	left: 0;
	display: none;
	width: 100%;
	background: #F8F8FF;
  }
  
  nav ul li:hover > ul {
	display: block;
	z-index: 100;
  }
  
  nav ul li a:hover {
	background: #E6E6FA;
	color: black;
	transform: translateY(-10px);
  }
  
  
  
  header {
	margin: 0;
	height: 100vh;
	overflow: hidden;
  }
  
  @keyframes slideshow {
	0% {background-image: url("{{imageSrc1}}");}
	50% {background-image: url("{{imageSrc2}}");}
	100% {background-image: url("{{imageSrc3}}");}
  }
  
  div[data-type="fade"] {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	animation-name: slideshow;
	animation-duration: 10s;
	animation-iteration-count: infinite;
	background-size: cover;
	background-position: center;
  }
  .center-left {
	display: flex;
	justify-content: center;
	align-items: center;
	top: 50%;

	border-radius: 10px; /* 모서리 둥글게 */
	padding: 20px; /* 패딩 추가 */
  }
  
  .center-left h2 {
	text-align: left;
	top:42%;
	font-family: 'Gamja Flower', sans-serif;
	color: #ACFFFC; /* 색상 변경: 슬레이트 블루 */
	font-size: 170px; /* 크기 변경: 130px */
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 텍스트 그림자 추가 */
	z-index: 50;
  }
  
  .center-left h2 .tag {
	color: #FF6347; /* 색상 변경: 토마토 */
	font-size: 140px; /* 크기 변경: 70px */
	
  }
  .tagline{

    color:white;
    top:50%;
    font-size:50px;
  }
  
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">




<!-- 컨텐츠 -->
<section>
    <div data-type="fade" data-speed="1000" data-time="4000" data-page="pageType1">
        
    </div>
    <header>
        <div>
            <h1>
                
                <a class='logo'>웅이네 유치원</a>
            </h1>
            <div class='login'> 
                  <ul>
                    <li><a href="../main/main.html">HOME</a></li>
                    <li><a href="/v2_common/login.html">로그인</a></li>
                  </ul>
                  
            </div>
            
        </div>

        <nav>
            <div>
                <div></div>
                <div></div>
            </div>
            <div data-orgH="60" data-gap="130px" data-leftPos="">
                <ul>
                    <li>
                        <a href="/v2_01a/intro/intro.html?proc=greeting">우리원소개</a>
                        <ul>
                            <li><a href="/v2_01a/intro/intro.html?proc=greeting">인사말</a></li>
                            <li><a href="/v2_01a/intro/intro.html?proc=history">운영방침 및 연혁</a></li>
                            <li><a href="/v2_01a/intro/intro.html?proc=teacher">선생님소개</a></li>
                            <li><a href="/v2_01a/intro/intro.html?proc=facility">시설안내</a></li>
                            <li><a href="/v2_01a/intro/intro.html?proc=location">찾아오시는 길</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/v2_01a/edu/edu.html?proc=edu_01">교육안내</a>
                        <ul>
                            <li><a href="/v2_01a/edu/edu.html?proc=edu_01">교육 프로그램</a></li>
                            <li><a href="/v2_01a/edu/edu.html?proc=edu_02">연간 교육계획</a></li>
                            <li><a href="/v2_01a/edu/edu.html?proc=edu_03">일일 활동계획</a></li>
                            <li><a href="/v2_01a/edu/edu.html?proc=edu_04">특별활동</a></li>
                            <li><a href="/v2_01a/edu/edu.html?proc=edu_05">교육행사</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/v2_01a/photo/list.html?tn=bbs_photo">포토앨범</a>
                        <ul>
                            <li><a href="/v2_01a/photo/photo.html?tn=bbs_photo&mMenuNum=1&classId=1">다윗반</a></li>
                            <li><a href="/v2_01a/photo/photo.html?proc=history&tn=bbs_photo&mMenuNum=4" ">이전년도 앨범보기</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/v2_01a/entrance/entrance_01.html">입학안내</a>
                        <ul>
                            <li><a href="/v2_01a/entrance/entrance_01.html">모집요강</a></li>
                            <li><a href="/v2_01a/entrance/entrance_02.html?tn=bbs_entrance">입학상담</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/v2_01a/community/notice.html?tn=bbs_notice">알림마당</a>
                        <ul>
                            <li><a href="/v2_01a/community/notice.html?tn=bbs_notice">공지사항</a></li>
                            <li><a href="/v2_01a/community/paper.html?tn=bbs_paper">가정통신문</a></li>
                            <li><a href="/v2_01a/community/food.html?tn=bbs_food">식단표</a></li>
                            <li><a href="/v2_01a/community/schedule.html?tn=schedule_info">행사일정</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <nav data-arrow="right">
            <div>
                <div>
                    <a href="javascript:void(0);" class="gnbClose"><div></div></a>
                </div>
            </div>
        </nav>
        <div class="gnbCover"></div>

		    <div class="center-left">
          <h2>&nbsp{{title}}</br>&nbsp&nbsp;&nbsp;<span class='tag'>{{tagline}}</span><br/><span class ='tagline'>&nbsp;&nbsp;웅이네 유치원은 노력합니다.</span></h2>
        
        </div>
        
    </header>
    
   
</section>


`;

const block = {
	hbs,
	name: 'Simple Header #2',
	previewImageUrl: 'https://gamma.app/_next/static/media/Title-card.409d7081.svg',
	category: 'header',
	defaultData: {
		logo: "https://i.imgur.com/vdPp1yM.png",
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
