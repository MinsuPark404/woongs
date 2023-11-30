-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다. 

-- cms_admins Table Create SQL
-- 테이블 생성 SQL - cms_admins
CREATE TABLE cms_admins
(
    `admin_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '관리자 순번', 
    `admin_email`       VARCHAR(50)     NULL        COMMENT '관리자 이메일', 
    `admin_password`    VARCHAR(60)     NULL        COMMENT '관리자 비밀번호', 
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

-- 테이블 Comment 설정 SQL - cms_admins
ALTER TABLE cms_admins COMMENT '관리자. 관리자 관련 데이터 저장';


-- cms_businesses Table Create SQL
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

-- 테이블 Comment 설정 SQL - cms_businesses
ALTER TABLE cms_businesses COMMENT '어린이집. 어린이집 관련 데이터 저장';

-- Foreign Key 설정 SQL - cms_businesses(admin_idx) -> cms_admins(admin_idx)
ALTER TABLE cms_businesses
    ADD CONSTRAINT  FOREIGN KEY (admin_idx)
        REFERENCES cms_admins (admin_idx) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- children Table Create SQL
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

-- 테이블 Comment 설정 SQL - children
ALTER TABLE children COMMENT '원생. 원생 관련 데이터 저장';

-- Foreign Key 설정 SQL - children(business_bno) -> cms_businesses(business_bno)
ALTER TABLE children
    ADD CONSTRAINT  FOREIGN KEY (business_bno)
        REFERENCES cms_businesses (business_bno) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- cms_url Table Create SQL
-- 테이블 생성 SQL - cms_url
CREATE TABLE cms_url
(
    `url_idx`         INT UNSIGNED     NOT NULL    AUTO_INCREMENT COMMENT '도메인 순번', 
    `url_addr`        VARCHAR(1000)    NULL        COMMENT '도메인 주소', 
    `url_status`      CHAR(10)          NULL        COMMENT '도메인 상태', 
    `business_bno`    VARCHAR(20)      NULL        COMMENT '어린이집 사업자번호', 
    `url_created_at`  DATETIME         NULL        COMMENT '도메인 등록 일자', 
    `url_period_at`   DATETIME         NULL        COMMENT '도메인 만료 일자', 
     PRIMARY KEY (url_idx)
);

-- 테이블 Comment 설정 SQL - cms_url
ALTER TABLE cms_url COMMENT '도메인. 도메인 관련 데이터 저장';

-- Foreign Key 설정 SQL - cms_url(business_bno) -> cms_businesses(business_bno)
ALTER TABLE cms_url
    ADD CONSTRAINT  FOREIGN KEY (business_bno)
        REFERENCES cms_businesses (business_bno) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- cms_users Table Create SQL
-- 테이블 생성 SQL - cms_users
CREATE TABLE cms_users
(
    `user_idx`         INT UNSIGNED    NOT NULL    AUTO_INCREMENT COMMENT '직원 순번', 
    `user_email`       VARCHAR(50)     NULL        COMMENT '직원 이메일', 
    `user_password`    VARCHAR(60)     NULL        COMMENT '직원 비밀번호', 
    `user_name`        VARCHAR(30)     NULL        COMMENT '직원 이름', 
    `user_tel`         VARCHAR(20)     NULL        COMMENT '직원 전화번호', 
    `user_status`      VARCHAR(20)     NULL        COMMENT '직원 상태', 
    `business_bno`     VARCHAR(20)     NULL        COMMENT '어린이집 사업자번호', 
    `user_created`     DATETIME        NULL        DEFAULT now() COMMENT '직원 등록', 
    `user_updated_at`  DATETIME        NULL        DEFAULT now() COMMENT '직원 수정 일자', 
    `user_deleted_at`  DATETIME        NULL        DEFAULT now() COMMENT '직원 삭제 일자', 
    `user_role`        VARCHAR(30)     NULL        COMMENT '직원 역할', 
    `user_last_login`  DATETIME        NULL        DEFAULT now() COMMENT '직원 최종 로그인', 
     PRIMARY KEY (user_idx)
);

-- Foreign Key 설정 SQL - cms_users(business_bno) -> cms_businesses(business_bno)
ALTER TABLE cms_users
    ADD CONSTRAINT  FOREIGN KEY (business_bno)
        REFERENCES cms_businesses (business_bno) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- cms_videos Table Create SQL
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

-- 테이블 Comment 설정 SQL - cms_videos
ALTER TABLE cms_videos COMMENT '비디오. cctv 영상 관련 데이터 저장';

-- Foreign Key 설정 SQL - cms_videos(business_bno) -> cms_businesses(business_bno)
ALTER TABLE cms_videos
    ADD CONSTRAINT  FOREIGN KEY (business_bno)
        REFERENCES cms_businesses (business_bno) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- cms_url_log Table Create SQL
-- 테이블 생성 SQL - cms_url_log
CREATE TABLE cms_url_log
(
    `log_idx`   INT UNSIGNED     NOT NULL    AUTO_INCREMENT COMMENT '로그 순번', 
    `log_date`  DATE             NULL        COMMENT '로그 날짜만', 
    `log_time`  TIME             NULL        COMMENT '로그 시간만', 
    `log_ip`    VARCHAR(20)      NULL        COMMENT '로그 아이피', 
    `url_addr`  VARCHAR(1000)    NULL        COMMENT '도메인 주소', 
     PRIMARY KEY (log_idx)
);

-- 테이블 Comment 설정 SQL - cms_url_log
ALTER TABLE cms_url_log COMMENT '도메인 로그. 도메인 관련 데이터 저장';

-- Foreign Key 설정 SQL - cms_url_log(url_addr) -> cms_url(url_addr)
ALTER TABLE cms_url_log
    ADD CONSTRAINT  FOREIGN KEY (url_addr)
        REFERENCES cms_url (url_addr) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- cms_log Table Create SQL
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

-- Foreign Key 설정 SQL - cms_log(admin_idx) -> cms_admins(admin_idx)
ALTER TABLE cms_log
    ADD CONSTRAINT  FOREIGN KEY (admin_idx)
        REFERENCES cms_admins (admin_idx) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- cms_contents Table Create SQL
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

-- Foreign Key 설정 SQL - cms_contents(business_name) -> cms_businesses(business_name)
ALTER TABLE cms_contents
    ADD CONSTRAINT  FOREIGN KEY (business_name)
        REFERENCES cms_businesses (business_name) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- child_attendance Table Create SQL
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

-- 테이블 Comment 설정 SQL - child_attendance
ALTER TABLE child_attendance COMMENT '출석부. 어린이집 원생의 출석 관련 데이터 저장';

-- Foreign Key 설정 SQL - child_attendance(child_idx) -> children(child_idx)
ALTER TABLE child_attendance
    ADD CONSTRAINT  FOREIGN KEY (child_idx)
        REFERENCES children (child_idx) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- anomaly_detection Table Create SQL
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

-- 테이블 Comment 설정 SQL - anomaly_detection
ALTER TABLE anomaly_detection COMMENT '이상탐지. 이상탐지 관련 데이터 저장';

-- Foreign Key 설정 SQL - anomaly_detection(business_name) -> cms_businesses(business_name)
ALTER TABLE anomaly_detection
    ADD CONSTRAINT  FOREIGN KEY (business_name)
        REFERENCES cms_businesses (business_name) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- 테이블 생성 SQL - board
CREATE TABLE board (
    `board_idx` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시물의 고유 인덱스',
    `user_idx` INT UNSIGNED NULL COMMENT '작성자 사용자 ID',
    `business_bno` VARCHAR(20) NULL COMMENT '어린이집 사업자번호', 
    `header` VARCHAR(20) COMMENT '게시물의 종류를 나타내는 머리글',
    `title` VARCHAR(50) NULL COMMENT '게시물의 제목',
    `content` TEXT NOT NULL COMMENT '게시물의 내용',
    `board_created_at` DATETIME NULL DEFAULT NOW() COMMENT '게시물 생성 시각',
    `board_updated_at` DATETIME NULL DEFAULT NOW() COMMENT '게시물 수정 시각',
    PRIMARY KEY (board_idx)
);

-- 테이블 Comment 설정 SQL - child_attendance
ALTER TABLE board COMMENT '게시판. 어린이집 게시판 관련 데이터 저장';

ALTER TABLE board
    ADD CONSTRAINT fk_board_user_idx
    FOREIGN KEY (user_idx) REFERENCES cms_users(user_idx);

ALTER TABLE board
    ADD CONSTRAINT fk_board_business_bno
    FOREIGN KEY (business_bno) REFERENCES cms_businesses(business_bno);


