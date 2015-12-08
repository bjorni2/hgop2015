#!/bin/bash

set -e
set -o pipefail

if [ "$1" == "" ]; then
  echo Usage: "'./run_acceptance_tests.sh <API_ADDRESS>'"
  exit 1
fi

api="$1"

echo Exporting ACCEPTANCE_URL..
export ACCEPTANCE_URL=http://$api

npm install

echo
echo Running acceptance tests..
grunt mochaTest:acceptance
