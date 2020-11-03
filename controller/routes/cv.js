const cvnode = require('opencv4nodejs');
var cv = require('opencv');
var request = require('request');
var fs = require('fs');
var imagick = require('imagick')
// replace with path where you unzipped coco-SSD_227x227 model
const modelsPath = '../cv-models';

const prototxt = path.resolve(modelsPath, 'deploy.prototxt');
const modelFile = path.resolve(modelsPath, 'pascalvoc2012_train_simple2_iter_300000.caffemodel');

if (!fs.existsSync(prototxt) || !fs.existsSync(modelFile)) {
  console.log('exiting: could not find ssdcoco model');
  console.log('download the model from: https://drive.google.com/file/d/0BzKzrI_SkD1_dUY1Ml9GRTFpUWc/view');
  return;
}

// initialize ssdcoco model from prototxt and modelFile
const net = cv.readNetFromCaffe(prototxt, modelFile);

module.exports = (server) => {
  server.get('/cv/:n', (req, res) => {
    request(
      `http://127.0.0.1:8080?action=snapshot&n=${req.params.n}`,
      function (err, response, body) {
        classifyImg(cv.readImage(body)).forEach(p => console.log(p));
      });
  });
}

const classifyImg = (img) => {
  const white = new cv.Vec(255, 255, 255);
  // ssdcoco model works with 227 x 227 images
  const imgResized = img.resize(227, 227);

  // network accepts blobs as input
  const inputBlob = cv.blobFromImage(imgResized);
  net.setInput(inputBlob);

  // forward pass input through entire network, will return
  // classification result as 1x1xNxM Mat
  let outputBlob = net.forward();
  // extract NxM Mat
  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[2], outputBlob.sizes[3]);

  const results = Array(outputBlob.rows).fill(0)
    .map((res, i) => {
      const className = classNames[outputBlob.at(i, 1)];
      const confidence = outputBlob.at(i, 2);
      const topLeft = new cv.Point(
        outputBlob.at(i, 3) * img.cols,
        outputBlob.at(i, 6) * img.rows
      );
      const bottomRight = new cv.Point(
        outputBlob.at(i, 5) * img.cols,
        outputBlob.at(i, 4) * img.rows
      );

      return ({
        className,
        confidence,
        topLeft,
        bottomRight
      })
    });

    return results;
};
