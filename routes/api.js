var PETS = {
  '1': {'pet': 'This is the first blog post.'},
  '2': {'pet': 'This is the second blog post.'},
  '3': {'pet': 'This is the third blog post.'}
};


var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/', function(req, res, next) {
  res.send(PETS);
});

router.get('/pets', function(req, res, next) {
  res.json(POSTS);
})

module.exports = router;
