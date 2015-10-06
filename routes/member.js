var express = require('express');
var router = express.Router();
var multer = require('multer');
var $q = require('q');
var upload = multer();
var errorUtil = require('../service/util/errorUtil.js');
var memberCtrl = require('../controller/memberCtrl.js');
var baseUtil = require('../service/util/baseUtil.js');

router.get('/test', function (req, res, next) {
  res.send(200);
});

router.post('/login', upload.array(), function (req, res, next) {
  var query = req.body;
  if (query.mobile && query.deviceId) {
    memberCtrl.loginWithMobile(query).then(function (responce) {
      res.status(200).send(responce);
    }, function (error) {
      res.status(500).send(error);
    });
  } else if (query.deviceId) {
    memberCtrl.logonWithDeviceId(query).then(function (responce) {
      res.status(200).send(responce);
    }, function (error) {
      res.status(500).send(error);
    });
  } else {
    res.status(400).send(errorUtil("requestParamsError"));
  }
});

router.post('/update', upload.array(), function (req, res, next) {
  var query = req.body;
  baseUtil.verifyAuth(req.headers).then(function (deviceId) {
    memberCtrl.updateMemberInfo(query).then(function (responce) {
      res.status(200).send(responce);
    }, function (error) {
      res.status(500).send(error);
    });
  },function(){
    res.status(400).send(errorUtil("noPermission"));
  });
});

router.post('/register', upload.array(), function (req, res, next) {
  var query = req.body;
  memberCtrl.registerMember(query).then(function (responce) {
    res.status(200).send(responce);
  }, function (error) {
    res.status(500).send(error);
  });
});

router.get('/isMobileExist', function (req, res, next) {
  var query = req.query;
  memberCtrl.isMobileExist(query).then(function (responce) {
    res.status(200).send(responce);
  }, function (error) {
    res.status(500).send(error);
  });
});

router.get('/isUsernameExist', function (req, res, next) {
  var query = req.query;
  memberCtrl.isUsernameExist(query).then(function (responce) {
    res.status(200).send(responce);
  }, function (error) {
    res.status(500).send(error);
  });
});

module.exports = router;
