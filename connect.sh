#!/bin/sh
chmod 400 key
ssh -o StrictHostKeyChecking=no -i key -fNR 8081:localhost:8081 ydngjink1234@34.82.79.134
ssh -o StrictHostKeyChecking=no -i key -fNR 8082:localhost:8082 ydngjink1234@34.82.79.134
