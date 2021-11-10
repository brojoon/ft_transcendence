dockerize -wait tcp://postgresql:5432 -timeout 60s;
node dist/src/main.js;
