#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
nvm use 8

$LOGNAME="reset.log"

#!/bin/bash
mkdir tmp
touch tmp/$LOGNAME
echo $(date) Run >> $BASEDIR/tmp/reboot.log
export DISPLAY=:0 #needed if you are running a simple gui app.

process="v8.17.0/bin/node"
makerun="node $BASEDIR/pi-node/factory-reset.js >> tmp/$LOGNAME"

echo Running $makerun

if ps ax | grep -v grep | grep $process > /dev/null
then
    echo 'Already running';
    exit
else
    echo $makerun | bash
fi

exit
