FROM node:18.7.0 AS builder

WORKDIR /app

COPY . .

RUN cd /app/frontend
RUN npm i --force

COPY /app/frontend/build/ /app/backend/public/

RUN cd /app/backend

FROM builder

WORKDIR /app/

CMD ["npm", "start"]