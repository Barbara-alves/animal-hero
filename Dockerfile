FROM node:18.7.0 AS builder

WORKDIR /app

COPY . .

WORKDIR /app/frontend
RUN npm i --force
RUN npm run build
RUN cp -r /app/frontend/build/ /app/backend/public

WORKDIR /app/backend
RUN npm i
FROM builder

CMD ["npm", "start"]