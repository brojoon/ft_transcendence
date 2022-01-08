#!/bin/bash
ln -s /etc/nginx/sites-available/ft_server /etc/nginx/sites-enabled/
rm -rf /etc/nginx/sites-enabled/default
nginx -g 'daemon off;'