#!/bin/sh

# start Dockerized Nginx reverse proxy
docker container run --rm --network host -v ${PWD}/nginx-dev.conf:/etc/nginx/conf.d/default.conf:ro nginx &

# start backend
cd server && lucky dev &

# start frontend
cd client && yarn dev &

sleep infinity

kill $!
cd server && overmind q