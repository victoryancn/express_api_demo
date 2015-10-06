var express = require('express');
var router = express.Router();
var member = require('./member.js');
var common = require('./common.js');
var app = express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.use('/member',member);
router.use('/common',common);
module.exports = router;
