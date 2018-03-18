var gpio = require("gpio");
var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: false
};
const pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    console.log("Initialization done");

    // Set the pulse length to 1500 microseconds for channel 2
    pwm.setPulseLength(4, 1500);

    // Set the duty cycle to 25% for channel 8
    pwm.setDutyCycle(4, 0.25);

    // Turn off all power to channel 6
    // (with optional callback)
    pwm.channelOff(4, function() {
        if (err) {
            console.error("Error turning off channel.");
        } else {
            console.log("Channel 6 is off.");
        }
    });
});


const MOTORS = {
  '1a': 11,
  '1b': 12,
  '2a': 13,
  '2b': 15
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
