dockerize -wait tcp://back:3095 -timeout 300s > /dev/null 2>&1 && npm run start;