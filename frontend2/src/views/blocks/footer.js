



const hbs = `

<!DOCTYPE html>

<style>
footer {
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  font-size: 14px;
  line-height: 1.6;
}

footer .wrap {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

footer .logo {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

footer .info .morelink {
  margin-bottom: 15px;
}

footer .info .morelink a {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
}

footer .info .morelink a:hover {
  text-decoration: underline;
}

footer address {
  margin-bottom: 15px;
}

footer aside a {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
}

footer aside a:hover {
  text-decoration: underline;
}
</style>




</head>

<body>



<!-- 컨텐츠 -->
<section class="main">


<footer>
	<div class="wrap">
		<div class="logo">웅이네 유치원</div>
		<div class="info">
			<div class="morelink">
				<a href="/v2_common/agree.html">이용약관</a>                           
				<a href="/v2_common/privacy.html">개인정보처리방침</a>
				<a href="/v2_common/join_agree.html">회원가입</a>
				<a href="/v2_common/search.html">아이디/비밀번호찾기</a>
			</div>
			<address>
				<p class="copy">
					<span>광주시 대성학원</span>
					<span>전화 : 02-1234-4567</span>
					<span>개인정보관리책임자 : 정지웅 (OOO@OOO.OOO)</span>
				</p>
				<p>&copy; by 웅이네. All rights reserved.</p>
			</address>
		</div>
		<aside>
			<a href="/admin/">Admin</a>
			<a href="http://www.ebikids.co.kr" target="_blank">Design by 웅이네</a>
		</aside>
	</div><!-- //end wrap -->
</footer>

</section><!-- //main -->



	
	
	





</body>
</html>
`;

const block = {
	hbs,
	name: 'footer #1',
	previewImageUrl: 'https://gamma.app/_next/static/media/ImagesWithTextIcons.85edfaa6.svg',
	category: 'photo',
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
