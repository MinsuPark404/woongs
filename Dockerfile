# Node.js 이미지를 기반으로 설정
FROM node:20.10.0

# 작업 디렉토리 설정
WORKDIR /app

# 나머지 프로젝트 파일 복사
COPY . .
