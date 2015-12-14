#!/bin/bash

set -e
set -o pipefail

if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

export 	DISPLAY=:0
npm install
bower install
./dockerbuild.sh $GIT_COMMIT $GIT_URL
