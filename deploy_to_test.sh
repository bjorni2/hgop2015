#!/bin/bash

echo Pushing image to dockerhub..
docker push bjorni/tictactoe

echo Killing and removing all containers from test env..
ssh vagrant@192.168.33.10 'docker rm -f $(docker ps -aq)'

echo pulling latest version from dockerhub..
ssh vagrant@192.168.33.10 'docker pull bjorni/tictactoe'

echo Starting the container..
ssh vagrant@192.168.33.10 'docker run -p 9000:8080 -d -e "NODE_ENV=production" bjorni/tictactoe'
