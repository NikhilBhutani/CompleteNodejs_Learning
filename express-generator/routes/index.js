var express = require('express');
var router = express.Router();

/* GET home page. */

//it simply means when you will browse localhost:3000, it will simply render this index.js file here.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world and hello express generator' });
});

module.exports = router;
