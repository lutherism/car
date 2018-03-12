import request from 'request';
import {setInterval, clearInterval} from 'timers';

const ROBOT_IP = '127.20.70.1';
const ROBOT_PORT = 8080;

function watchRobotState(cb) {
  setInterval(() => {
    request({
      uri: `http://${ROBOT_IP}:${ROBOT_PORT}/state`
    }, (err, resp) => {
      if (err) {
        return console.error('FAILURE GETTING ROBOT DATA', err);
      }
      return cb(resp.body);
    });
  }, 200);
}

export default function intiRobotRoutes(server) {
  let latestState = {};

  watchRobotState(state => {
    latestState = state;
  });

  app.get('/robot-stream', (req, resp) => {
    let lastSentState = null;
    const interval = setInterval(() => {
      if (lastSentState !== latestState) {
        lastSentState = latestState;
        resp.send(latestState);
      }
    }, 200);

    req.on('close', () => clearInterval(interval))
  });
}
