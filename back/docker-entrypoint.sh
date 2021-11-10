dockerize -wait tcp://postgresql:5432 -timeout 30s 
node dist/src/main.js 