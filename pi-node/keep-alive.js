var fs = require('fs');
const WebSocket = require('ws');
const {Socket} = require('net');
var through = require('through')
var os = require('os');
var pty = require('node-pty');
const { Duplex } = require('stream');

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

var ts = through(function write(data) {
  console.log('through data', data);
  this.queue(data);
},
function end () { //optional
  this.queue(null)
});

const delay = ms => new Promise(res => setTimeout(res, ms))
let backoffTime = 100;
const MAX_DELAY = 20000;

function recursiveConnect() {
  return keepOpenGatewayConnection()
  .catch((err) => {
    console.log(`err happened, backoff at ${backoffTime}ms`);
    // assumes that the error is "request made too soon"
    if (backoffTime < MAX_DELAY) {
      backoffTime *= 2;
    }
    console.log(err);
    return delay(backoffTime).then(() => {
      console.log('retrying...');
      return recursiveConnect();
    });
  });
}

recursiveConnect();

let DeviceData = {};


DeviceData = JSON.parse(fs.readFileSync('./openroboticsdata/data.json'));

function keepOpenGatewayConnection() {
  return new Promise((resolve, reject) => {
    try {
      const client = new WebSocket('ws://localhost:3001', 'ssh-protocol');
      //console.log(client.on)
      var clientStream = WebSocket.createWebSocketStream(client);
      clientStream.on('error', () => {});
      client.on('error', function() {
            console.log('WebSocket Connection Error');
            reject();
      });

      client.onopen = function() {
          console.log('WebSocket Client Connected');
          if (client.readyState === client.OPEN) {
            ptyProcess.on('data', (data) => {
              client.send(data);
            });
            ptyProcess.write('echo \'' +
              `Welcome to Open Robotics Terminal! Device UUID: ${DeviceData.deviceUuid}`
              + '`\'\r');
          }

          function sendNumber() {
              if (client.readyState === client.OPEN) {
                  var number = Math.round(Math.random() * 0xFFFFFF);
                  /*console.log('sending', JSON.stringify({
                    deviceUuid: DeviceData.deviceUuid,
                    number
                  }))
                  client.send(JSON.stringify({
                    deviceUuid: DeviceData.deviceUuid,
                    number
                  }));*/
                  setTimeout(sendNumber, 3000);
              }
          }
          sendNumber();
      };

      client.onclose = function() {
          console.log('ssh-protocol Client Closed');
          reject();
      };

      client.onmessage = function(e) {
          if (typeof e.data === 'string') {
              //console.log(e.data);
              ptyProcess.write(e.data);
          }
      };
    } catch (e) {
      console.log('error caught', e)
      reject();
    }
  });
}
