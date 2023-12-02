# Node.js 이미지를 기반으로 설정
FROM node:20.10.0

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일들을 복사
COPY package*.json ./

# npm install을 실행
RUN npm install

# 나머지 프로젝트 파일 복사
COPY . .

# 애플리케이션을 위한 포트를 노출
EXPOSE 5001

# 애플리케이션 실행
CMD [ "node", "start" ]
