/**
 * Created by victoryan on 15/9/30.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var $q = require('q');
var upload = multer();
var errorUtil = require('../service/util/errorUtil.js');
var baseUtil = require('../service/util/baseUtil.js');

router.get('/test', function (req, res, next) {
  res.res.sendStatus(200);
});

router.post('/upload', upload.single('file'), function (req, res, next) {
  var file = req.file;
  baseUtil.aliyunUpload(file).then(function (url) {
    res.status(400).send({url: url});
  }, function (err) {
    res.status(400).send(err);
  })
});

router.post('/uploadMusic', upload.single('file'), function (req, res, next) {
  var file = req.file;
  baseUtil.aliyunUpload(file).then(function (url) {
    res.status(400).send({url: url});
  }, function (err) {
    res.status(400).send(err);
  })
});

module.exports = router;
