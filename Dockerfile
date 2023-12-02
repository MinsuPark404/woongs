# backend2 Dockerfile
# Node.js 이미지를 기반으로 설정
FROM node:18.18.2

# 작업 디렉토리 설정
WORKDIR /app

# 나머지 프로젝트 파일 복사
COPY . .

# 애플리케이션을 위한 포트를 노출
EXPOSE 5001