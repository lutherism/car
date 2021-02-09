#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
## Install Operating System from Raw Raspberry Pi and git clone
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

nvm install 8

nvm use 8

npm install

/root/.nvm/versions/node/v8.17.0/bin/node $BASEDIR/pi-node/factory-reset.js
