-- 테이블 생성 SQL - cms_admins
CREATE TABLE cms_admins
(
    `admin_idx`            INT UNSIGNED  NOT NULL  AUTO_INCREMENT,  -- 관리자 순번  
    `admin_email`          VARCHAR(50)   NULL,                      -- 관리자 이메일
    `admin_password`       VARCHAR(60)   NULL,                      -- 관리자 비밀번호
    `admin_name`           VARCHAR(30)   NULL,                      -- 관리자 이름
    `admin_tel`            VARCHAR(20)   NULL,                      -- 관리자 전화번호
    `admin_role`           VARCHAR(20)   NULL,                      -- 관리자 역할
    `admin_status`         VARCHAR(20)   NULL,                      -- 관리자 상태
    `admin_business_name`  VARCHAR(50)   NULL,                      -- 어린이집 이름  
    `admin_created_at`     DATETIME      NULL      DEFAULT now(),   -- 관리자 등록일자 
    `admin_updated_at`     DATETIME      NULL      DEFAULT now(),   -- 관리자 수정일자 
    `admin_last_login`     DATETIME      NULL      DEFAULT now(),   -- 관리자 최종 로그인
     PRIMARY KEY (admin_idx)
);

-- 테이블 생성 SQL - cms_businesses
CREATE TABLE cms_businesses
(
    `business_idx`         INT UNSIGNED   NOT NULL  AUTO_INCREMENT,  -- 어린이집 순번 
    `business_name`        VARCHAR(50)    NULL,                      -- 어린이집 이름 
    `business_admin`       VARCHAR(40)    NULL,                      -- 어린이집 관리자 
    `business_tel`         VARCHAR(20)    NULL,                      -- 어린이집 전화번호 
    `business_addr1`       VARCHAR(1000)  NULL,                      -- 어린이집 주소1 
    `business_addr2`       VARCHAR(1000)  NULL,                      -- 어린이집 주소2 
    `business_bno`         VARCHAR(20)    NULL,                      -- 어린이집 사업자번호
    `business_url`         VARCHAR(1000)  NULL,                      -- 어린이집 도메인 
    `business_created_at`  DATETIME       NULL      DEFAULT now(),   -- 어린이집 등록일자 
    `admin_idx`            INT UNSIGNED   NULL,                      -- 관리자 순번 
     PRIMARY KEY (business_idx),
);

-- 테이블 생성 SQL - cms_url
CREATE TABLE cms_url
(
    `url_idx`          INT UNSIGNED   NOT NULL  AUTO_INCREMENT,        -- 도메인 순번 
    `url_addr`         VARCHAR(1000)  NULL,                            -- 도메인 주소 
    `url_status`       CHAR(1)        NULL,                            -- 도메인 활성화 여부 
    `business_bno`     INT UNSIGNED   NULL,                            -- 어린이집 순번(동시에 무슨 어린이집인지 같이)스칼라쿼리
    `url_archived_at`  DATE           NULL      DEFAULT(DATE(NOW())),  -- 로그 날짜
    'url_period'       VARCHAR(20)    NULL,                            -- 도메인 유효기간  
     PRIMARY KEY (url_idx)
);


-- 테이블 생성 SQL - cms_users
CREATE TABLE cms_users
(
    `user_idx`         INT UNSIGNED  NOT NULL  AUTO_INCREMENT,  -- 도메인 순번
    `user_email`       VARCHAR(50)   NULL,                      -- 직원 이메일
    `user_password`    VARCHAR(60)   NULL,                      -- 직원 비밀번호
    `user_name`        VARCHAR(30)   NULL,                      -- 직원 이름
    `user_tel`         VARCHAR(20)   NULL,                      -- 직원 전화번호
    `user_created`     DATETIME      NULL      DEFAULT now(),   -- 직원 등록일자
    `user_updated_at`  DATETIME      NULL      DEFAULT now(),   -- 직원 수정일자
    `user_deleted_at`  DATETIME      NULL      DEFAULT now(),   -- 직원 삭제일자
    `user_role`        VARCHAR(30)   NULL,                      -- 직원 역할
    `user_last_login`  DATETIME      NULL      DEFAULT now(),   -- 직원 최종 로그인
--  `business_idx`     INT UNSIGNED  NULL,                      -- 어린이집 순번
     PRIMARY KEY (user_idx)
);

-- CCTV 영상을 네트워크로 받아서 중앙 로컬의 각 폴더에 저장되었다는 가정
-- 테이블 생성 SQL - cms_videos
CREATE TABLE cms_videos
(
    `video_idx`          INT UNSIGNED   NOT NULL  AUTO_INCREMENT,  -- 비디오 순번
    `video_name`         VARCHAR(50)    NULL,                      -- 비디오 이름
    `video_path`         VARCHAR(1000)  NULL,                      -- 비디오 경로
    `video_recoded_at`   DATETIME       NULL,                      -- 비디오 촬영일자
    `video_archived_at`  DATETIME       NULL,					   -- 비디오 보관일자
    `video_created_at`   DATETIME       NULL      DEFAULT now(),   -- 비디오 등록일자
    `business_bno`       INT			NULL,                      -- 어린이집 사업자 번호
    PRIMARY KEY (video_idx)
);

-- 테이블 생성 SQL - cms_url_log
CREATE TABLE cms_url_log
(
    `log_idx`   INT UNSIGNED  NOT NULL  AUTO_INCREMENT,        -- 로그 순번 
    `log_date`  DATE          NULL      DEFAULT(DATE(NOW())),  -- 로그 날짜 
    `log_time`  DATE          NULL      DEFAULT(TIME(NOW())),  -- 로그 시간 
    `log_ip`    VARCHAR(20)   NULL,                            -- 로그 아이피 
--  `url_idx`   INT UNSIGNED  NULL,                            -- 도메인 순번 
     PRIMARY KEY (log_idx)
);

-- 테이블 생성 SQL - cms_menu
CREATE TABLE cms_menu
(
    `menu_idx`         INT UNSIGNED  NOT NULL  AUTO_INCREMENT,  -- 메뉴 순번
    `menu_detail`      JSON          NULL,                      -- 메뉴 내용을 담고있는 JSON 파일
    `menu_created_at`  DATETIME      NULL      DEFAULT now(),   -- 메뉴 등록일자 
    `menu_updated_at`  DATETIME      NULL      DEFAULT now(),   -- 메뉴 수정일자 
    `url_idx`          INT UNSIGNED  NULL,                      -- 도메인 순번 
     PRIMARY KEY (menu_idx)
);

-- 테이블 생성 SQL - cms_log
CREATE TABLE cms_log
(
    `cms_log_idx`    INT UNSIGNED  NOT NULL  AUTO_INCREMENT,  -- 고객관리 로그인
    `business_name`  VARCHAR(20)   NULL,                      -- 어린이집 이름
    `admin_name`     VARCHAR(20)   NULL,                      -- 관리자 이름
    `logged_at`      DATETIME      NULL      DEFAULT now(),   -- 로그인 날짜
    `log_info`       VARCHAR(20)   NULL,                      -- 로그인 성공 여부 
    `log_ip`         VARCHAR(20)   NULL,                      -- 로그인 아이피 
    `logouted_at`    DATETIME      NULL      DEFAULT now(),   -- 로그아웃 날짜 
    `admin_idx`      INT UNSIGNED  NULL,                      -- 관리자 순번
     PRIMARY KEY (cms_log_idx)
);

-- 테이블 생성 SQL - cms_contents
CREATE TABLE cms_contents 
(
    `content_seq`         INT UNSIGNED  NOT NULL  AUTO_INCREMENT,  -- 컨텐츠 순번
    `content_detail`      JSON          NULL,                      -- 컨텐츠 내용을 담고있는 JSON 파일
    `business_name`       VARCHAR(50)   NULL,                      -- 어린이집 이름 
    `content_created_at`  DATETIME      NULL      DEFAULT now(),   -- 컨텐츠 등록일자
    `content_updated_at`  DATETIME      NULL      DEFAULT now(),   -- 컨텐츠 수정일자
--  `url_idx`             INT UNSIGNED  NULL,                      -- 도메인 순번 
     PRIMARY KEY (content_seq)
)

-- 테이블 생성 SQL - anomaly_detection
CREATE TABLE anomaly_detection
(
    `detection_idx`                  INT UNSIGNED  NULL AUTO_INCREMENT,
    `video_idx`           INT           NULL, -- cms_videos 테이블의 비디오 순번 참조
    `detected_at`         DATETIME      NULL, -- 이상 탐지된 날짜 및 시간
    `type`                VARCHAR(100)  NULL, -- 이상 탐지 유형 (예: 움직임, 소리 등)
    `details`             TEXT,                    -- 이상 탐지에 대한 추가 세부 사항
    `is_notified`         BOOLEAN       NULL DEFAULT FALSE, -- 알림 발송 여부
    PRIMARY KEY (detection_idx)
);

CREATE TABLE daily_visits (
    date DATE PRIMARY KEY,
    count INT DEFAULT 0
);

CREATE TABLE total_visits (
    count INT
);
