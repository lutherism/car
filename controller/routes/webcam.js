var request = require('request');

module.exports = (server) => {
  server.get('/stream/:n', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    req.pipe(
      request(`http://127.0.0.1:8080?action=snapshot&n=${req.params.n}`)
        .on('error', () => res.send(500))
    ).pipe(res);
  });
}
