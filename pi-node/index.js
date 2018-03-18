const raspi = require('raspi');
const gpio = require('raspi-gpio');

raspi.init(() => {
  const input = new gpio.DigitalInput({
    pin: 'P1-3',
    pullResistor: gpio.PULL_UP
  });

  const output = new gpio.DigitalOutput('P1-5');

  output.write(input.read());
});
