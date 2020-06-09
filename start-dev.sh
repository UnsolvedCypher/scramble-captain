#!/bin/sh

# start Dockerized Nginx reverse proxy
docker container run --rm --name dev-nginx --network host --log-driver=none -v ${PWD}/nginx-dev.conf:/etc/nginx/conf.d/default.conf:ro nginx &

# start backend
cd server && lucky dev &

# start frontend
cd client && yarn dev &

FRONTEND=$!

echo "** Press enter to quit **"
read

kill $FRONTEND
docker kill dev-nginx
cd server && overmind q
echo "All set"