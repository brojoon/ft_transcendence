FROM  debian:buster

RUN     apt-get update && apt-get upgrade && apt-get install -y \
        nginx \
        vim
	
COPY    ./nginx.conf /etc/nginx/sites-available/ft_server
COPY	./dist /var/www/html/dist
COPY	./index.html /var/www/html
COPY    ./favicon.ico /var/www/html
COPY    ./init.sh ./

EXPOSE  80 8082

CMD    	bash init.sh