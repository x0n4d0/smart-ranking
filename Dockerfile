FROM node:14.18.0-slim

WORKDIR /smart-ranking-api/

COPY . . 

RUN npm i --silent
RUN npm i -g @nestjs/cli@8.2.5

USER node 

EXPOSE 8080