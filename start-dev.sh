#!/bin/sh

# Parentheses run everything in a subshell so ctrl+c will kill everything together

# start Dockerized Nginx reverse proxy
(docker container run --rm --name dev-nginx --network host --log-driver=none -v ${PWD}/nginx-dev.conf:/etc/nginx/conf.d/default.conf:ro nginx &

# start backend
cd server && lucky dev &

# start frontend
cd client && yarn dev)