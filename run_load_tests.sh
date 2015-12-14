#!/bin/bash

set -e
set -o pipefail

if [ "$1" == "" ]; then
  echo Usage: "'./run_load_tests.sh <API_ADDRESS>'"
  exit 1
fi

#export MOCHA_REPORTER=xunit
#export MOCHA_REPORT=server-tests.xml

api="$1"

echo Exporting ACCEPTANCE_URL..
export ACCEPTANCE_URL=http://$api

npm install

echo
echo Running load tests..
grunt mochaTest:load
