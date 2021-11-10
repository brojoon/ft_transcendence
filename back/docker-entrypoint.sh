dockerize -wait tcp://postgresql:5432 -timeout 60s;
npm run start:prod; 
