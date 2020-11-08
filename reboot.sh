#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
~/.nvm/nvm.sh use 8
/home/pi/.config/nvm use 8

#!/bin/bash

export DISPLAY=:0 #needed if you are running a simple gui app.

process=node
makerun="node $BASEDIR/pi-node/keep-alive.js"

if ps ax | grep -v grep | grep $process > /dev/null
then
    exit
else
    $makerun &
fi

exit
