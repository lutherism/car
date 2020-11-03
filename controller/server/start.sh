#!/bin/bash -

/home/pi/.nvm/versions/node/v8.10.0/bin/node /home/pi/car/car/controller/server/app.js &
LD_PRELOAD=/usr/lib/uv4l/uv4lext/armv6l/libuv4lext.so \
/home/pi/car/car/mjpg-streamer/mjpg_streamer -i "/home/pi/car/car/mjpg-streamer/input_uvc.so" -o "/home/pi/car/car/mjpg-streamer/output_http.so -w /home/pi/car/car/www"
