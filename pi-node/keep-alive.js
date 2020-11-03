import websocket from 'websocket';
import fs from 'fs';
const {w3cwebsocket: W3CWebSocket} = websocket;

var client = new W3CWebSocket('ws://robots-gateway.uc.r.appspot.com/', 'echo-protocol');

let DeviceData = {};

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send(JSON.stringify({
              deviceUuid: DeviceData.deviceUuid,
              number
            }));
            setTimeout(sendNumber, 8000);
        }
    }
    sendNumber();
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};

DeviceData = JSON.parse(fs.readFileSync('./openroboticsdata/data.json'));
