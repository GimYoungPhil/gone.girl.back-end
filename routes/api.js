var querystring = require('querystring');
var http = require('http');
var express = require('express');
var router = express.Router();

var queryData = querystring.stringify({
  '_type' : 'json',
  'bgnde' : '20151108',
  'endde' : '20151109',
  'ServiceKey' : 'Z3bYXoHuTv1ttp4LF7sHs8H+eoEmVB+bLwO9WCYTD5cenWgZuBCxOiQiTmQIJBb9bvG1Vms1673ukVKMpxB50g=='
});

var options = {
  hostname: "openapi.animal.go.kr",
  path: "/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?" + queryData,
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
  }
};

var createRequest = function(callback) {

  var result = '';

  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // console.log('BODY: ' + chunk);
      result += chunk;
    });
    res.on('end', function() {
      // console.log('No more data in response.')
      callback(JSON.parse(result));
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
    res.json(data);
  });
});

router.get('/pets', function(req, res, next) {
  res.json(POSTS);
});

module.exports = router;
