FROM node:18.7.0 AS builder

WORKDIR /app

COPY . .

RUN cd frontend
RUN npm i --force

COPY ./build/ /app/backend/public/

RUN cd backend

FROM builder

WORKDIR /app/

CMD ["npm", "start"]