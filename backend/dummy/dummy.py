from faker import Faker
from deep_translator import GoogleTranslator
import random
import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime, timedelta, time

# MySQL 연결 정보
username = 'root'
password = '1234'
host = 'localhost'
database = 'CMS_PROJECT'

# SQLAlchemy 엔진 생성
engine = create_engine(f"mysql+pymysql://{username}:{password}@{host}/{database}")


def translate_to_english(word):
    result = GoogleTranslator(source='auto', target='english').translate(word)
    return result

pw1 = '$2b$10$id82CrtjfwsLQ8V.iKOYRu8R4BJBMh0931M6QTEV8i7ydpONn4M5m'
pw2 = '$2b$10$0P8os9inWFWj60HKart74.k14fY8zmVlTLKjnsm6W1v8eKXXwHnOa'
pw3 = '$2b$10$tPH5Rck8yLmAGntzc0LMVOKhb7V2ybUBjiMZpOfChZNddNhwzW5I.'
pw4 = '$2b$10$wd/ARUbPiR3JTiuou7E7tO4lTr.ocPJynThC8xqom6R2hooFQ3EDi'

fake = Faker('ko_KR')
Faker.seed(1)

repeat_count = 100

admin_name = [fake.name() for i in range(repeat_count)]

# admin_name_english = [translate_to_english(name).lower().replace(" ", "").replace("-", "") for name in admin_name]
admin_name_english = [translate_to_english(name).split()[0].replace("-", "").lower() + str(random.randint(100, 99999)) for name in admin_name]

admin_email = [name + random.choice(["@naver.com", "@gmail.com"]) for name in admin_name_english]

admin_password = [random.choice([pw1,pw2, pw3, pw4]) for i in range(repeat_count)]
admin_tel = [('010-'+str(random.randint(1, 9999)).zfill(4) + '-'+str(random.randint(1, 9999)).zfill(4)) for i in range(repeat_count)]
admin_role = 'admin_c'
admin_status = 1
business_bno = [(str(random.randint(1, 999)).zfill(3)+'-'+str(random.randint(1, 99)).zfill(2) +'-'+str(random.randint(1, 99999)).zfill(5)) for i in range(repeat_count)]

def random_time():
    # 무작위 시간 생성
    return time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59))

admin_created_at = [datetime.combine(fake.date_between(start_date='-1y', end_date='today'), random_time()) for _ in range(repeat_count)]
admin_updated_at = [created_at + timedelta(days=random.randint(1, (datetime.now() - created_at).days), seconds=random.randint(0, 86400)) for created_at in admin_created_at]

def safe_random_datetime(start_datetime):
    # 오늘 날짜와 시간과 start_datetime 사이의 시간 차이 계산
    delta = datetime.now() - start_datetime
    delta_seconds = int(delta.total_seconds())
    # delta_seconds가 0보다 클 경우에만 random.randint 사용, 그렇지 않으면 start_datetime 반환
    return start_datetime + timedelta(seconds=random.randint(1, delta_seconds)) if delta_seconds > 0 else start_datetime

admin_last_login = [safe_random_datetime(updated_at) for updated_at in admin_updated_at]

df = pd.DataFrame()
df['admin_email'] = admin_email
df['admin_password'] = admin_password
df['admin_name'] = admin_name
df['admin_tel'] = admin_tel
df['admin_role'] = admin_role
df['admin_status'] = admin_status
df['business_bno'] = business_bno
df['admin_created_at'] = admin_created_at
df['admin_updated_at'] = admin_updated_at
df['admin_last_login'] = admin_last_login
df['admin_idx'] = range(1, len(df) + 1)  # 'admin_idx' 칼럼 추가
df['admin_status'] = df['admin_status'].astype(str)  # 'admin_status' 칼럼 타입 변경

df_admins = pd.DataFrame({
    'admin_email': admin_email,
    'admin_password': admin_password,
    'admin_name': admin_name,
    'admin_tel': admin_tel,
    'admin_role': admin_role,
    'admin_status': admin_status,  # 이후에 데이터 타입을 변환할 예정
    'business_bno': business_bno,
    'admin_created_at': admin_created_at,
    'admin_updated_at': admin_updated_at,
    'admin_last_login': admin_last_login
})

# 데이터프레임을 MySQL에 저장
df_admins.to_sql('cms_admins', con=engine, if_exists='append', index=False)

business_names =[
 '가을어린이집',
 '감동어린이집',
 '감사어린이집',
 '감성어린이집',
 '강남어린이집',
 '겨울어린이집',
 '계절어린이집',
 '곰돌이어린이집',
 '공예어린이집',
 '교육어린이집',
 '구름어린이집',
 '그림어린이집',
 '기쁨어린이집',
 '기술어린이집',
 '꽃바람어린이집',
 '꿈나무어린이집',
 '끈기어린이집',
 '나무어린이집',
 '나비어린이집',
 '노래어린이집',
 '단비어린이집',
 '달빛어린이집',
 '도움어린이집',
 '도전어린이집',
 '동명어린이집',
 '동화어린이집',
 '마법어린이집',
 '모험어린이집',
 '무지개어린이집',
 '무한어린이집',
 '문자어린이집',
 '문화어린이집',
 '물고기어린이집',
 '미래어린이집',
 '미소어린이집',
 '바다어린이집',
 '바람어린이집',
 '발견어린이집',
 '발명어린이집',
 '발자국어린이집',
 '배움어린이집',
 '번개어린이집',
 '별빛어린이집',
 '보물어린이집',
 '보상어린이집',
 '보석어린이집',
 '보헤미안어린이집',
 '봄바람어린이집',
 '사랑어린이집',
 '사자어린이집',
 '상상어린이집',
 '새싹어린이집',
 '색채어린이집',
 '성공어린이집',
 '세계어린이집',
 '소통어린이집',
 '숫자어린이집',
 '승리어린이집',
 '식물어린이집',
 '안전어린이집',
 '에너지어린이집',
 '여름어린이집',
 '역사어린이집',
 '예술어린이집',
 '용기어린이집',
 '우주어린이집',
 '웃음어린이집',
 '음악어린이집',
 '이야기어린이집',
 '이태원어린이집',
 '인내어린이집',
 '자신감어린이집',
 '자연어린이집',
 '전통어린이집',
 '존중어린이집',
 '지산어린이집',
 '지식어린이집',
 '지혜어린이집',
 '짱구어린이집',
 '창조어린이집',
 '첨단어린이집',
 '초록나무어린이집',
 '축하어린이집',
 '친절어린이집',
 '코끼리어린이집',
 '탐험어린이집',
 '태양어린이집',
 '평화어린이집',
 '표현어린이집',
 '푸른나무어린이집',
 '푸른하늘어린이집',
 '하늘어린이집',
 '학습어린이집',
 '행복어린이집',
 '행성어린이집',
 '협곡어린이집',
 '협력어린이집',
 '호기심어린이집',
 '희망나무어린이집',
 '희망어린이집']  # 어린이집 이름

# 어린이집 더미 데이터 생성
business_admins = [random.randint(1, 100) for _ in range(repeat_count)]  # 관리자 인덱스 (1부터 100 사이)
business_tels = [fake.phone_number() for _ in range(repeat_count)]  # 전화번호
business_addr1 = [fake.address() for _ in range(repeat_count)]  # 주소
business_addr2 = [random.choice(['104호','102호', '1012호', '101호']) for i in range(repeat_count)]   # 추가 주소

# 중복되지 않는 숫자를 생성하기 위해 set 사용
unique_numbers = set()
while len(unique_numbers) < repeat_count:
    unique_numbers.add(random.randint(1, 9999))  # 1부터 9999 사이의 숫자를 랜덤하게 선택

# 각 숫자에 대해 URL 생성
business_urls = ["http://example{}.com".format(number) for number in unique_numbers]

business_created_at = [fake.date_time_between(start_date='-2y', end_date='now') for _ in range(repeat_count)]  # 등록일자

# DataFrame 생성
df_businesses = pd.DataFrame({
    'business_name': business_names,
    'business_admin': admin_name,
    'business_tel': business_tels,
    'business_addr1': business_addr1,
    'business_addr2': business_addr2,
    'business_bno': business_bno,
    'business_url': business_urls,
    'business_created_at': business_created_at,
    'admin_idx': business_admins  # 임의로 관리자 인덱스를 재사용
})

# admin_idx를 df_admins에 추가
df_admins['admin_idx'] = range(1, len(df_admins) + 1)

# admin_name을 기반으로 admin_idx를 찾아서 df_businesses에 추가
admin_idx_map = dict(zip(df_admins['admin_name'], df_admins['admin_idx']))
df_businesses['admin_idx'] = df_businesses['business_admin'].map(admin_idx_map)

# business_bno는 이미 생성되었다고 가정
df_businesses['business_bno'] = business_bno  # business_bno 리스트 또는 다른 데이터 소스에서 가져옴

# 이제 df_businesses에 admin_idx와 business_bno가 포함되어 있음