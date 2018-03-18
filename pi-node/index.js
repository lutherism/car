var gpio = require("gpio");
var Gpio = require('pigpio').Gpio,
  motor = new Gpio(10, {mode: Gpio.OUTPUT}),
  pulseWidth = 1000,
  increment = 100;

const MOTORS = {
  '1a': 11,
  '1b': 12,
  '2a': 13,
  '2b': 15
};

const PINS = {
  '1': 4,
  '2': 5
};

Promise.all(Object.keys(MOTORS).map(motorKey => {
  return new Promise((reject, resolve) => {
    const motor = gpio.export(MOTORS[motorKey], {
       // When you export a pin, the default direction is out. This allows you to set
       // the pin value to either LOW or HIGH (3.3V) from your program.
       direction: 'out',

       // set the time interval (ms) between each read when watching for value changes
       // note: this is default to 100, setting value too low will cause high CPU usage
       interval: 200,

       // Due to the asynchronous nature of exporting a header, you may not be able to
       // read or write to the header right away. Place your logic in this ready
       // function to guarantee everything will get fired properly
       ready: function() {
         resolve(motor);
       }
     });
   });
})).then(motors => {
  motors.map(motor => motor.set());
});
