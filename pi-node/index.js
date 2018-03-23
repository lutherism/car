var gpio = require("gpio");
var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;
const repl = require('repl');

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 60,
    debug: true
};
const s = {

};

const pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        console.error("Error initializing PCA9685", err);
        process.exit(-1);
    }
    console.log("Initialization done");
    const steeringMid = 1500;
    const speedMid = 200;

    // Set the pulse length to 1500 microseconds for channel 2
    pwm.setPulseLength(0, steeringMid);
    pwm.setPulseLength(4, speedMid);
    pwm.setPulseLength(5, speedMid);
    var next = -150;

    // Turn off all power to channel 6
    // (with optional callback)
    pwm.channelOn(4);
    pwm.channelOn(5);
    pwm.channelOn(0);
    s.pwm = pwm;
    s.h = () => {
      pwm.setPulseLength(0, 1500);
    }
    s.l = () => {
      pwm.setPulseLength(0, 1350);
    }
    s.r = () => {
      pwm.setPulseLength(0, 1650);
    }
    s.sp = (speed) => {
      pwm.setPulseLength(4, speed);
      pwm.setPulseLength(5, speed);
    }
    s.f = () => {
      s.motors[0].set(0);
      s.motors[1].set();
      s.motors[2].set(0);
      s.motors[3].set();
    }
    s.s = () => {
      s.motors[0].set(0);
      s.motors[1].set(0);
      s.motors[2].set(0);
      s.motors[3].set(0);
    }
    s.b = () => {
      s.motors[0].set();
      s.motors[1].set(0);
      s.motors[2].set();
      s.motors[3].set(0);
    }
});


const MOTORS = {
  '1a': 17,
  '1b': 18,
  '2a': 27,
  '2b': 22
};

Promise.all(Object.keys(MOTORS).map(motorKey => {
  return new Promise((resolve, reject) => {
    const motor = gpio.export(MOTORS[motorKey], {
       // When you export a pin, the default direction is out. This allows you to set
       // the pin value to either LOW or HIGH (3.3V) from your program.
       direction: 'out',

       // set the time interval (ms) between each read when watching for value changes
       // note: this is default to 100, setting value too low will cause high CPU usage
       interval: 400,

       // Due to the asynchronous nature of exporting a header, you may not be able to
       // read or write to the header right away. Place your logic in this ready
       // function to guarantee everything will get fired properly
       ready: function() {
         resolve(motor);
       }
     });
   });
})).then(motors => {
  var f = true;
  motors[0].set(0);
  motors[1].set(0);
  motors[2].set(0);
  motors[3].set(0);
  console.log('setting motors', motors.map(m => m.value));
  s.motors = motors;
});


repl.start('> ').context.s = s;
