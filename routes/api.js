
var options = {
  hostname: "openapi.animal.go.kr",
  path: "/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20151020&endde=20151028&ServiceKey=Z3bYXoHuTv1ttp4LF7sHs8H%2BeoEmVB%2BbLwO9WCYTD5cenWgZuBCxOiQiTmQIJBb9bvG1Vms1673ukVKMpxB50g%3D%3D",
  method: "GET",
  headers: {
    'Content-Type': 'application/xml',
  }
};

var http = require('http');
var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

var createRequest = function(callback) {

  var resultXML = '';
  // console.log(options);
  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // console.log('BODY: ' + chunk);
      resultXML += chunk;
    });
    res.on('end', function() {
      // console.log('No more data in response.')
      callback(resultXML);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
};

/* GET api listing. */
router.get('/', function(req, res, next) {

  createRequest(function(data) {

    parseString(data, function (err, result) {
      res.json(result);
    });
  });

  // res.send({});
});

router.get('/pets', function(req, res, next) {
  res.json(POSTS);
})

module.exports = router;
