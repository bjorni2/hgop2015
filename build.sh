#!/bin/bash

set -e
set -o pipefail

export 	DISPLAY=:0
npm install
bower install
./dockerbuild.sh $GIT_COMMIT $GIT_URL
