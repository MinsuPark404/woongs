-- 테이블 생성 SQL - cms_admins
CREATE TABLE cms_admins
(
    `admin_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '관리자 순번', 
    `admin_email`       VARCHAR(50)     NULL        COMMENT '관리자 이메일', 
    `admin_password`    VARCHAR(40)     NULL        COMMENT '관리자 비밀번호', 
    `admin_name`        VARCHAR(30)     NULL        COMMENT '관리자 이름', 
    `admin_tel`         VARCHAR(20)     NULL        COMMENT '관리자 전화번호', 
    `admin_role`        VARCHAR(20)     NULL        COMMENT '관리자 역할', 
    `admin_status`      VARCHAR(20)     NULL        COMMENT '관리자 상태', 
    `business_bno`      VARCHAR(20)     NULL        COMMENT '어린이집 사업자번호', 
    `admin_created_at`  DATETIME        NULL        DEFAULT now() COMMENT '관리자 등록 일자', 
    `admin_updated_at`  DATETIME        NULL        DEFAULT now() COMMENT '관리자 수정 일자', 
    `admin_last_login`  DATETIME        NULL        DEFAULT now() COMMENT '관리자 최종 로그인', 
     PRIMARY KEY (admin_idx)
);

-- 테이블 생성 SQL - cms_businesses
CREATE TABLE cms_businesses
(
    `business_idx`         INT UNSIGNED     NOT NULL    AUTO_INCREMENT COMMENT '어린이집 순번', 
    `business_name`        VARCHAR(50)      NULL        COMMENT '어린이집 이름', 
    `business_admin`       VARCHAR(40)      NULL        COMMENT '어린이집 관리자', 
    `business_tel`         VARCHAR(20)      NULL        COMMENT '어린이집 전화번호', 
    `business_addr1`       VARCHAR(1000)    NULL        COMMENT '어린이집 주소1', 
    `business_addr2`       VARCHAR(1000)    NULL        COMMENT '어린이집 주소2', 
    `business_bno`         VARCHAR(20)      NULL        COMMENT '어린이집 사업자번호', 
    `business_url`         VARCHAR(1000)    NULL        COMMENT '어린이집 도메인', 
    `business_created_at`  DATETIME         NULL        DEFAULT now() COMMENT '어린이집 등록 일자', 
    `admin_idx`            INT UNSIGNED     NULL        COMMENT '관리자 순번', 
     PRIMARY KEY (business_idx)
);

-- 테이블 생성 SQL - children
CREATE TABLE children
(
    `child_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '원생 순번', 
    `child_name`        VARCHAR(30)     NULL        COMMENT '원생 이름', 
    `child_age`         TINYINT         NULL        COMMENT '원생 나이', 
    `child_gender`      VARCHAR(20)     NULL        COMMENT '원생 성별', 
    `child_class`       VARCHAR(20)     NULL        COMMENT '원생 교실', 
    `business_bno`      VARCHAR(20)     NULL        COMMENT '어린이집 사업자번호', 
    `child_created_at`  DATETIME        NULL        DEFAULT NOW() COMMENT '원생 등록 일자', 
    `child_updated_at`  DATETIME        NULL        DEFAULT NOW() COMMENT '원생 수정 일자', 
     PRIMARY KEY (child_idx)
);

-- 테이블 생성 SQL - cms_url
CREATE TABLE cms_url
(
    `url_idx`         INT UNSIGNED     NOT NULL    AUTO_INCREMENT COMMENT '도메인 순번', 
    `url_addr`        VARCHAR(1000)    NULL        COMMENT '도메인 주소', 
    `url_status`      CHAR(1)          NULL        COMMENT '도메인 상태', 
    `business_bno`    VARCHAR(20)      NULL        COMMENT '어린이집 사업자번호', 
    `url_created_at`  DATETIME         NULL        COMMENT '도메인 등록 일자', 
    `url_period_at`   DATETIME         NULL        COMMENT '도메인 만료 일자', 
     PRIMARY KEY (url_idx)
);

-- 테이블 생성 SQL - cms_users
CREATE TABLE cms_users
(
    `user_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '직원 순번', 
    `user_email`       VARCHAR(50)     NULL        COMMENT '직원 이메일', 
    `user_password`    VARCHAR(30)     NULL        COMMENT '직원 비밀번호', 
    `user_name`        VARCHAR(30)     NULL        COMMENT '직원 이름', 
    `user_tel`         VARCHAR(20)     NULL        COMMENT '직원 전화번호', 
    `admin_status`     VARCHAR(20)     NULL        COMMENT '관리자 상태', 
    `business_bno`     VARCHAR(20)     NULL        COMMENT '어린이집 사업자번호', 
    `user_created`     DATETIME        NULL        DEFAULT now() COMMENT '직원 등록', 
    `user_updated_at`  DATETIME        NULL        DEFAULT now() COMMENT '직원 수정 일자', 
    `user_deleted_at`  DATETIME        NULL        DEFAULT now() COMMENT '직원 삭제 일자', 
    `user_role`        VARCHAR(30)     NULL        COMMENT '직원 역할', 
    `user_last_login`  DATETIME        NULL        DEFAULT now() COMMENT '직원 최종 로그인', 
     PRIMARY KEY (user_idx)
);

-- 테이블 생성 SQL - cms_videos
CREATE TABLE cms_videos
(
    `video_idx`          INT UNSIGNED     NOT NULL    AUTO_INCREMENT COMMENT '비디오 순번', 
    `video_name`         VARCHAR(50)      NULL        COMMENT '비디오 이름', 
    `video_path`         VARCHAR(1000)    NULL        COMMENT '비디오 경로', 
    `video_recoded_at`   DATETIME         NULL        COMMENT '비디오 촬영 일자', 
    `video_archived_at`  DATETIME         NULL        COMMENT '비디오 보관 일자', 
    `video_created_at`   DATETIME         NULL        DEFAULT now() COMMENT '비디오 등록 일자', 
    `business_bno`       VARCHAR(20)      NULL        COMMENT '어린이집 사업자번호', 
     PRIMARY KEY (video_idx)
);

-- 테이블 생성 SQL - cms_url_log
CREATE TABLE cms_url_log
(
    `log_idx`   INT UNSIGNED     NOT NULL    AUTO_INCREMENT COMMENT '로그 순번', 
    `log_date`  DATE             NULL        COMMENT '로그 날짜만', 
    `log_time`  DATE             NULL        COMMENT '로그 시간만', 
    `log_ip`    VARCHAR(20)      NULL        COMMENT '로그 아이피', 
    `url_addr`  VARCHAR(1000)    NULL        COMMENT '도메인 주소', 
     PRIMARY KEY (log_idx)
);

-- 테이블 생성 SQL - cms_menu
CREATE TABLE cms_menu
(
    `menu_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '메뉴 순번', 
    `menu_detail`      JSON            NULL        COMMENT '메뉴 디테일', 
    `menu_created_at`  DATETIME        NULL        DEFAULT now() COMMENT '메뉴 등록 일자', 
    `menu_updated_at`  DATETIME        NULL        DEFAULT now() COMMENT '메뉴 수정 일자', 
    `url_idx`          INT UNSIGNED    NULL        COMMENT '도메인 순번', 
     PRIMARY KEY (menu_idx)
);

-- 테이블 생성 SQL - cms_log
CREATE TABLE cms_log
(
    `cms_log_idx`    INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '고객 로그 순번', 
    `business_name`  VARCHAR(50)     NULL        COMMENT '어린이집 이름', 
    `admin_name`     VARCHAR(30)     NULL        COMMENT '관리자 이름', 
    `logged_at`      DATETIME        NULL        DEFAULT now() COMMENT '접속 일자', 
    `log_info`       VARCHAR(20)     NULL        COMMENT '로그 성공여부', 
    `log_ip`         VARCHAR(20)     NULL        COMMENT '로그 아이피', 
    `logouted_at`    DATETIME        NULL        DEFAULT now() COMMENT '종료 일자', 
    `admin_idx`      INT UNSIGNED    NULL        COMMENT '관리자 순번', 
     PRIMARY KEY (cms_log_idx)
);

-- 테이블 생성 SQL - cms_contents
CREATE TABLE cms_contents
(
    `content_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '컨텐츠 순번', 
    `content_detail`      JSON            NULL        COMMENT '컨텐츠 디테일', 
    `business_name`       VARCHAR(50)     NULL        COMMENT '어린이집 이름', 
    `content_created_at`  DATETIME        NULL        DEFAULT now() COMMENT '컨텐츠 등록 일자', 
    `content_updated_at`  DATETIME        NULL        DEFAULT now() COMMENT '컨텐츠 수정 일자', 
     PRIMARY KEY (content_idx)
);

-- 테이블 생성 SQL - child_attendance
CREATE TABLE child_attendance
(
    `attendance_idx`     INT UNSIGNED    NOT NULL                 AUTO_INCREMENT COMMENT '출석 순번', 
    `child_idx`          INT UNSIGNED    NULL                     COMMENT '원생 순번', 
    `attendance_status`  VARCHAR(20)     NULL                     COMMENT '출석 상태태',
    `business_bno`       VARCHAR(20)     NULL                     COMMENT '어린이집 사업자번호호',
    `attendance_date`    DATE            NULL      DEFAULT now()  COMMENT '출석 날짜만만',
    `attendance_time`    TIME            NULL      DEFAULT now()  COMMENT '출석 시간만', 
     PRIMARY KEY (attendance_idx)
);

-- 테이블 생성 SQL - anomaly_detection
CREATE TABLE anomaly_detection
(
    `detection_idx`     INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '이상탐지 순번', 
    `detection_type`    VARCHAR(50)     NULL        COMMENT '이상탐지 유형', 
    `detection_detail`  TEXT            NULL        COMMENT '이상탐지 디테일', 
    `cctv_id`           VARCHAR(50)     NULL        COMMENT 'CCTV 아이디', 
    `business_name`     VARCHAR(50)     NULL        COMMENT '어린이집 이름', 
    `detected_at`       DATETIME        NULL        COMMENT '탐지된 일자', 
     PRIMARY KEY (detection_idx)
);

-- 테이블 생성 SQL - board
CREATE TABLE board (
    board_idx INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시물의 고유 인덱스',
    user_idx INT UNSIGNED NULL COMMENT '작성자 사용자 ID',
    business_bno VARCHAR(20) NULL COMMENT '어린이집 사업자번호', 
    header VARCHAR(20) COMMENT '게시물의 종류를 나타내는 머리글',
    title VARCHAR(50) NULL COMMENT '게시물의 제목',
    content TEXT NOT NULL COMMENT '게시물의 내용',
    board_created_at DATETIME NULL DEFAULT NOW() COMMENT '게시물 생성 시각',
    board_updated_at DATETIME NULL DEFAULT NOW() COMMENT '게시물 수정 시각',
    PRIMARY KEY (board_idx)
);


SELECT * FROM cms_admins;
SELECT * FROM cms_businesses;
SELECT * FROM children;
SELECT * FROM cms_url;
SELECT * FROM cms_users;
SELECT * FROM cms_videos;
SELECT * FROM cms_url_log;
SELECT * FROM cms_menu;
SELECT * FROM cms_log;
SELECT * FROM cms_contents;
SELECT * FROM child_attendance;
SELECT * FROM anomaly_detection;
SELECT * FROM board;