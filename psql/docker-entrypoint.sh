dockerize -wait tcp://postgresql:5432 -timeout 60s;
psql postgres < db.sql -U postgres -w;