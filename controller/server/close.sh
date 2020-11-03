#!/bin/bash -

netstat -pl | grep mjpg_streamer | awk '{gsub(/\/mjpg_streamer/, 't'); print $7}' | xargs kill -9 &>/dev/null
netstat -pl | grep 4444 | awk '{gsub(/\/node/, 't'); print $7}' | xargs kill -9 &>/dev/null
