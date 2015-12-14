#!/bin/bash

set -e
set -o pipefail

#export MOCHA_REPORTER=xunit
#export MOCHA_REPORT=server-tests.xml

echo Cleaning...
rm -rf ./dist

if [ "$1" == "" -o "$2" == "" ]; then
  echo Usage: "'./build.sh <GIT_COMMIT> <GIT_URL>'"
  exit 1
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $2 | rev | cut -c 5- | rev)

echo Building app
grunt

cat > ./dist/githash.txt <<_EOF_
$1
_EOF_

cat > ./dist/public/version.html << _EOF_
<!doctype html>
<head>
   <title>TicTacToe version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$1</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$1">History of current version</a></div>
</body>
_EOF_

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t bjorni/tictactoe:$1 .

echo Pushing image to dockerhub..
docker push bjorni/tictactoe:$1

echo "Done"
