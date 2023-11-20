FROM node:18.7.0 AS builder

WORKDIR /app

COPY . .

WORKDIR /app/frontend
RUN npm i --force
RUN ls -la .
RUN cp -r /app/frontend/build/ /app/backend/public

WORKDIR /app/backend
FROM builder

CMD ["npm", "start"]