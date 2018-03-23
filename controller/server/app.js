var express = require('express');
var initDashboardApp = require('../dashboard');
var initRoutes = require('../routes/index');

var app = express();

initDashboardApp(app);
initRoutes(app);

app.listen(4444, function begin() {
  console.log('Listenting to 4444');
});
