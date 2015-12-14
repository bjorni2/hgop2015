#!/bin/bash

set -e
set -o pipefail

if [ "$1" == "" ]; then
  echo Usage: "'./deploy_to_test.sh <SERVER_IP> <PORT> <TAG>'"
  exit 1
fi

ip="$1"

echo
echo Killing and removing all containers from test env..
ssh vagrant@$ip "docker rm -f tictactoe$2"

echo
echo pulling latest version from dockerhub..
ssh vagrant@$ip "docker pull bjorni/tictactoe$2"

echo
echo Starting the container..
ssh vagrant@$ip "docker run -p $2:8080 -d --name tictactoe$2 -e 'NODE_ENV=production' bjorni/tictactoe$3"
