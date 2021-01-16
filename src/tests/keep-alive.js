var mockRequire = require('mock-require');
var test = require('tape');

var called = {};

class MockWebSocket {
  constructor() {
    called.constructor = true;
    called.instance = this;
    return this;
  }
  static createWebSocketStream() {
    called.createStream = true;
    return {
      on: () => {}
    };
  }
  send() {
    called.socketSend = true;
  }
  on() {
    called.socketOn = true;
  }
}

mockRequire('ws', MockWebSocket);
mockRequire('request', {
  post: () => {
    called.post = true;
  }
});
mockRequire('node-pty', {
  spawn: () => {
    called.spawn = true;
    return {
      on: () => {
        called.ptyOn = true;
      },
      write: () => {
        called.ptyWrite = true;
      }
    };
  }
});



function beforeEach() {

}

test('before', (t) => {
  console.log('before', called);
  t.plan(4);
  t.notEqual(called.spawn, true);
  t.notEqual(called.post, true);
  t.notEqual(called.spawn, true);
  t.notEqual(called.spawn, true);
  t.end();
});

test('after', (t) => {
  require('../../pi-node/keep-alive.js');
  called.instance.onopen();
  t.plan(5);
  t.equal(called.spawn, true);
  t.equal(called.post, true);
  t.equal(typeof called.instance.onopen, 'function');
  t.equal(typeof called.instance.onclose, 'function');
  t.equal(typeof called.instance.onmessage, 'function');
  called.instance.onmessage({
    data: JSON.stringify({type: 'pty-in', data: 'blah'})
  });
  clearInterval(called.instance.heartBeatInterval);
  t.end();
});
