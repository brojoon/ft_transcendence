dockerize -wait tcp://back:8081 -timeout 300s > /dev/null 2>&1 && npm run dev;