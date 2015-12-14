#!/bin/bash

if [ "$1" == "" ]; then
  echo Usage: "'./deploy_to_test.sh <SERVER_IP> <PORT> <TAG>'"
  exit 1
fi

ip="$1"

echo
echo Killing and removing container on port $2..
ssh vagrant@$ip "docker rm -f tictactoe$2"

set -e
set -o pipefail

echo
echo pulling latest version from dockerhub..
ssh vagrant@$ip "docker pull bjorni/tictactoe:$3"

echo
echo Starting the container..
ssh vagrant@$ip "docker run -p $2:8080 -d --name tictactoe$2 -e 'NODE_ENV=production' bjorni/tictactoe:$3"
