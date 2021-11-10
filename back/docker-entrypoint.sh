dockerize -wait tcp://0.0.0.0:5432 -timeout 5s

echo "Start server"
npm run start
