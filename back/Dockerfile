FROM node:14.18-alpine3.12

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN dockerize -wait tcp://172.16.238.10:5432 -timeout 30s

EXPOSE 3095

# RUN echo "back start"
# CMD [ "npm", "run", "start" ]

RUN chmod +x docker-entrypoint.sh  
ENTRYPOINT ./docker-entrypoint.sh
