#!/bin/bash

NGINX_ROOT=/usr/share/nginx/html
CONFIG_FILE=$NGINX_ROOT/main.*.js

sed -i "s|\${API_BASE_URL}|$API_BASE_URL|g" $CONFIG_FILE

exec nginx -g 'daemon off;'