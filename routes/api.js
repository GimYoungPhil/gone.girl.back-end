var express = require('express');
var router = express.Router();

var querystring = require('querystring');
var moment = require('moment');
var _ = require('underscore');
var http = require('http');

var API_PATH    = '/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?'
var SERVICE_KEY = 'Z3bYXoHuTv1ttp4LF7sHs8H+eoEmVB+bLwO9WCYTD5cenWgZuBCxOiQiTmQIJBb9bvG1Vms1673ukVKMpxB50g==';

var upkindMap = {
  'dog': 417000,
  'cat': 422400,
  'etc': 429900,
  'all': ''
}

var apiParams = {
  ServiceKey: SERVICE_KEY,
  _type:      'json',
  numOfRows:   200
};

var apiOptions = {
  hostname: "openapi.animal.go.kr",
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
  }
};

var makeOtions = function(bgnde, endde, type) {
  var params = _.extend(apiParams, {
    bgnde: bgnde,
    endde: endde,
    upkind: type ? upkindMap[type] : ''
  });

  var query = querystring.stringify(params);

  var options = _.extend(apiOptions, {
    path: API_PATH + query
  });

  return options;
};

var requestOpenAPI = function(options, callback) {
  var result = '';
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function() {
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
    res.json(data.response.body);
  });
});


/*
 *  recent
 *  method: GET
 */
router.get('/recent', function(req, res, next) {

  var todayStr = moment().format('YYYYMMDD');
  var options = makeOtions(todayStr, todayStr, 'all');

  requestOpenAPI(options, function(data) {
    res.json(data.response.body);
  });
});

/*
 *  cats
 *  method: GET
 */
router.get('/cats', function(req, res, next) {

  var lastStr = moment().subtract(10, 'days').format('YYYYMMDD');
  var todayStr = moment().format('YYYYMMDD');
  var options = makeOtions(lastStr, todayStr, 'cat');

  requestOpenAPI(options, function(data) {
    res.json(data.response.body);
  });
});

/*
 *  dogs
 *  method: GET
 */
router.get('/dogs', function(req, res, next) {

  var lastStr = moment().subtract(10, 'days').format('YYYYMMDD');
  var todayStr = moment().format('YYYYMMDD');
  var options = makeOtions(lastStr, todayStr, 'dog');

  requestOpenAPI(options, function(data) {
    res.json(data.response.body);
  });
});

/*
 *  etcs
 *  method: GET
 */
router.get('/etcs', function(req, res, next) {

  var lastStr = moment().subtract(30, 'days').format('YYYYMMDD');
  var todayStr = moment().format('YYYYMMDD');
  var options = makeOtions(lastStr, todayStr, 'etc');

  requestOpenAPI(options, function(data) {
    res.json(data.response.body);
  });
});

module.exports = router;
