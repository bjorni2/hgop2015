#!/bin/bash

set -e
set -o pipefail

if [ "$1" == "" ]; then
  echo Usage: "'./deploy_to_test.sh <SERVER_IP>'"
  exit 1
fi

ip="$1"

echo Pushing image to dockerhub..
docker push bjorni/tictactoe

echo
echo Killing and removing all containers from test env..
ssh vagrant@$ip 'docker rm -f $(docker ps -aq)'

echo
echo pulling latest version from dockerhub..
ssh vagrant@$ip 'docker pull bjorni/tictactoe'

echo
echo Starting the container..
ssh vagrant@$ip 'docker run -p 9000:8080 -d -e "NODE_ENV=production" bjorni/tictactoe'
