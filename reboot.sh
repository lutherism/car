#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
/.nvm/nvm.sh use 8
/home/pi/.config/nvm/nvm.sh use 8

#!/bin/bash

export DISPLAY=:0 #needed if you are running a simple gui app.

process=node
makerun="node $BASEDIR/pi-node/keep-alive.js"

echo Running $makerun

if ps ax | grep -v grep | grep $process > /dev/null
then
    echo 'Already running';
    exit
else
    echo sudo -u pi $makerun | bash
fi

exit
