/**
 * Created by victoryan on 15/9/24.
 */
var _ = require('underscore'),
  $q = require('q'),
  memberService = require('../service/memberService.js'),
  _ = require("underscore"),
  errorUtil = require("../service/util/errorUtil.js");

module.exports = {
  loginWithMobile: function (params) {
    var deferred = $q.defer();
    var mobile = params.mobile;
    memberService.findOne({mobile: mobile}, function (result) {
      if (!result) {
        deferred.reject(errorUtil("noneMember"));
      } else {
        var res = result.toJSON();
        if (!res.enable) {
          deferred.reject(errorUtil("memberDisabled"));
        } else {
          if (params.password != res.password) {
            deferred.reject(errorUtil("passwordWrong"));
          } else {
            deferred.resolve(res);
          }
        }
      }
    }, function (error) {
      deferred.reject(error);
    });
    return deferred.promise;
  },
  logonWithDeviceId: function (params) {
    var deferred = $q.defer();
    memberService.findOne(params, function (result) {
      if (!result) {
        memberService.create(params, function (res) {
          deferred.resolve(res);
        }, function (error) {
          deferred.reject(error);
        });
      } else {
        var res = result.toJSON();
        if (!res.enable) {
          deferred.reject(errorUtil("memberDisabled"));
        } else {
          deferred.resolve(res);
        }
      }
    });
    return deferred.promise;
  },
  updateMemberInfo: function (params) {
    var deferred = $q.defer();
    if (!params._id) {
      deferred.reject(errorUtil("requestParamsError"));
    } else {
      if (params.enable) {
        delete params.enable;
      }
      if (params.token) {
        delete params.token;
      }
      memberService.update(params, function (res) {
        deferred.resolve(res);
      }, function (error) {
        deferred.reject(error);
      });
    }
    return deferred.promise;
  },
  isMobileExist: function (params) {
    var deferred = $q.defer();
    if (!params.mobile) {
      deferred.reject(errorUtil("requestParamsError"));
    } else {
      var mobile = {mobile: params.mobile}
      memberService.findOne(mobile, function (res) {
        console.log(res);
        if (res !== null) {
          deferred.resolve({"exist": true});
        } else {
          deferred.resolve({"exist": false});
        }
      })
    }
    return deferred.promise;
  },
  isUsernameExist: function (params) {
    var deferred = $q.defer();
    if (!params.username) {
      deferred.reject(errorUtil("requestParamsError"));
    } else {
      var username = {mobile: params.mobile};
      memberService.findOne(params, function (res) {
        if (res !== null) {
          deferred.resolve({"exist": true});
        } else {
          deferred.resolve({"exist": false});
        }
      })
    }
    return deferred.promise;
  },
  registerMember: function (params) {
    var that = this;
    var deferred = $q.defer();
    if (!params.mobile || !params.password) {
      deferred.reject(errorUtil("requestParamsError"));
    } else {
      that.isMobileExist(params).then(function (data) {
        console.log(data);
        if (data.exist) {
          deferred.reject(errorUtil("memberExist"));
        } else {
          memberService.create(params, function (res) {
            deferred.resolve(res);
          }, function (error) {
            deferred.reject(error);
          });
        }
      }, function () {
        deferred.reject(errorUtil("requestParamsError"));
      });
    }
    return deferred.promise;
  }
};
