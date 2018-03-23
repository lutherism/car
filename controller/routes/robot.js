var request = require('request');
var timers = require('timers');
var setInterval = timers.setInterval;
var clearInterval = timers.clearInterval;/*
var RobotController = require('../../pi-node/robot-controller');
var RobotActions = require('../../pi-node/actions');*/

//console.log(RobotController);
const ROBOT_IP = '127.20.70.1';
const ROBOT_PORT = 8080;

module.exports = (server) => {
  var latestState = {};
  var robotController;
  /*RobotController.init().then(robotControllerAsync => {
    robotController = robotControllerAsync;
  });*/

  server.post('/eval', (req, res) => {
    const {scriptToRun} = req.body;

    console.log('eval', RobotActions, robotController);
    function scriptEval() {
      eval(`var RobotActions = this;` + scriptToRun);
    }
    scriptEval.call(Object.keys(RobotActions).reduce((a, k) => {
      a[k] = (arg) => {
        console.log('Acting', k, arg, robotController);
        RobotActions[k](arg)(robotController);
      };
      return a;
    }, {}))

    res.send(200);
  })
};
