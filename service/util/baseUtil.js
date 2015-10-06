/**
 * Created by victoryan on 15/9/24.
 */
var config = require("../../config.js");
var jwt = require("jsonwebtoken");
var errorUtil = require("./errorUtil.js");
var $q = require('q');
var OSS = require('aliyun-oss');
var option = {
  accessKeyId: "xxx",
  accessKeySecret: "xxx",
  host: 'xxx'
};
//aliyun upload
var oss = OSS.createClient(option);
module.exports = {
  verifyAuth: function (headers) {
    var deferred = $q.defer();
    if (!headers.hasOwnProperty('x-access-token')) {
      deferred.reject();
    } else {
      var token = headers['x-access-token'];
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          deferred.reject();
        } else {
          //FIXME lack token database verify
          deferred.resolve(decoded);
        }
      });
    }
    return deferred.promise;
  },
  verifyCode: function () {
    //FIXME lack code service
    return true;
  },
  aliyunUpload: function (file) {
    var deferred = $q.defer();
    console.log(file);
    if (!file || !file.buffer) {
      deferred.reject(errorUtil("emptyFile"));
    } else {
      var endpoint = '';
      if (!!file.mimetype) {
        if (file.mimetype.search('image' )!== -1 || file.mimetype.search('audio') !== -1) {
          endpoint = file.mimetype.split('/')[1];
        } else {
          deferred.reject(errorUtil("unknownFileType"));
        }
        oss.putObject({
          bucket: 'stringnote',
          object: Date.now() + '.' + endpoint,
          source: file.buffer
        }, function (err, res) {
          if (err !== null) {
            console.log(err);
            deferred.reject(errorUtil("uploadFail"));
          } else {
            deferred.resolve(res.objectUrl);
          }
        });
      } else {
        deferred.reject(errorUtil("unknownFileType"));
      }
    }
    return deferred.promise;
  }
};
