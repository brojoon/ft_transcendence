#!/bin/sh
ssh -o StrictHostKeyChecking=no -i ~/remote_sh/mykey -fNR 8081:localhost:8081 ubuntu@193.123.238.90
ssh -o StrictHostKeyChecking=no -i ~/remote_sh/mykey -fNR 8082:localhost:8082 ubuntu@193.123.238.90
