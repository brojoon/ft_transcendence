FROM node:14.18-buster
##위에 노드 버전도 중요함
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3090


RUN chmod 777 docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh
