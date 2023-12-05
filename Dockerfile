# Node.js 이미지를 기반으로 설정
FROM node:18.18.2

# 작업 디렉토리 설정
WORKDIR /app

# 백엔드 파일 복사 및 종속성 설치
COPY backend2 ./backend2/
WORKDIR /app/backend2
RUN npm install

COPY backend2/.env /app/backend2/

CMD ["node", "/app/backend2/server.js"]