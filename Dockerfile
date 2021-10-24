FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN node -v
