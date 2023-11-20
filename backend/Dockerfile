FROM node:18.7.0 AS builder

WORKDIR /app

COPY . .
RUN npm i

FROM builder

WORKDIR /app/

CMD ["npm", "start"]