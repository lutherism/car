#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
~/.nvm/nvm.sh use 8
node $BASEDIR/pi-node/keep-alive.js
