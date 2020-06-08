#!/bin/sh

docker container run --rm --network host -v ${PWD}/nginx-dev.conf:/etc/nginx/conf.d/default.conf:ro nginx