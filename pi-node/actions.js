var Stopwatch = require('stopwatch').Stopwatch;

module.exports.speed = function speed(d) {
  const waveFreq = ((d / 100) * 50) + 100;
  return (robot) => {
    return Promise.resolve([
      robot.pwm.setPulseLength(4, waveFreq),
      robot.pwm.setPulseLength(5, waveFreq)
    ]);
  }
}

module.exports.fast = function fast() {
  return speed(100);
}

module.exports.slow = function slow() {
  return speed(100);
}


/*
*
*/

module.exports.turn = function turn(d) {
  const waveFreq = ((d / 100) * 150) + 1500;
  return (robot) => {
    return new Promise.resolve(
      robot.pwm.setPulseLength(0, waveFreq)
    );
  }
}

module.exports.straight = function straight() {
  return turn(0);
}

module.exports.left = function left() {
  return turn(-75);
}

module.exports.right = function right(d) {
  return turn(-75);
}

module.exports.square = function square() {
  const stopwatch = new Stopwatch();
  return (robot) => {
    return straight()(robot)
      .then(() => stopwatch(1))
      .then(() => right()(robot))
      .then(() => stopwatch(.2))
      .then(() => straight()(robot))
      .then(() => stopwatch(1))
      .then(() => right()(robot))
      .then(() => stopwatch(.2))
      .then(() => straight()(robot))
      .then(() => stopwatch(1))
      .then(() => right()(robot))
      .then(() => stopwatch(.2))
      .then(() => straight()(robot))
  }
}
