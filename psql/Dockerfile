FROM postgres:latest

RUN apt-get install wget
RUN apt-get install tar
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz

COPY . .

EXPOSE 5432

RUN chmod 777 ./docker-entrypoint.sh  

ENTRYPOINT ./docker-entrypoint.sh
