var request = require('request');
var timers = require('timers');
var setInterval = timers.setInterval;
var clearInterval = timers.clearInterval;
var RobotController = require('../../pi-node/robot-controller');
var RobotActions = require('../../pi-node/actions');

//console.log(RobotController);
const ROBOT_IP = 'http://192.168.1.21/';
const ROBOT_PORT = 4444;

module.exports = (server) => {
  var latestState = {};
  var robotController;
  RobotController.init().then(robotControllerAsync => {
    robotController = robotControllerAsync;
  });

  server.post('/eval', (req, res) => {
    const {scriptToRun} = req.body;

    console.log('eval', RobotActions, robotController);
    function scriptEval() {
      eval(`var rc = RobotActions;` + scriptToRun + '; main(robotController)');
    }
    scriptEval.call(Object.keys(RobotActions).reduce((a, k) => {
      a[k] = (arg) => {
        console.log('Acting', k, arg, robotController);
        RobotActions[k](arg)(robotController);
      };
      return a;
    }, {}))

    res.send(200);
  });

  server.post('/action/:name', (req, res) => {
    const {wait} = req.body;

    console.log('Acting', req.params.name);
    RobotActions[req.params.name]()(robotController)
      .then(() => RobotActions.wait(wait))
      .then(() => RobotActions.stop()(robotController));

    res.send(200);
  })
};
