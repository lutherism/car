var express = require('express');
var initDashboardApp = require('../dashboard');
var initRoutes = require('../routes/index');
var initWebcameRoutes = require('../routes/webcam');
const { spawn } = require('child_process');

var app = express();

initDashboardApp(app);
initRoutes(app);
initWebcameRoutes(app);

app.listen(4444, function begin() {
  console.log('Listenting to 4444 and running streamer');
});

//./mjpg-streamer/mjpg_streamer -i "./mjpg-streamer/input_uvc.so" -o "./mjpg-streamer/output_http.so -w ./www"
