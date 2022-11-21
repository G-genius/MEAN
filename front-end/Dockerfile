FROM node:16.18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

RUN npm install -g serve
