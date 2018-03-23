var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function initDashboardApp(server) {
  console.log('mw');
  server.use(morgan('dev'));
  server.use(express.static('dist-static'));
  server.use(express.static('dist-client'));
  server.use(bodyParser.json());
}
