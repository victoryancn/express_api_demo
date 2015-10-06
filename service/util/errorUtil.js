var _ = require("underscore");
//FIXME 写成配置文件
module.exports = function (err) {
  var errorModel = {
    errorCode: 10000,
    message: "未知错误"
  };
  //错误判断
  if (err.name === "ValidationError") {
    var errors = err.errors;
    errorModel.errorFields = [];
    _.each(errors, function (value, key) {
      errorModel.errorFields.push(key);
    });
    errorModel.message = "缺少必须字段";
    errorModel.errorCode = 10001;
  } else if (err === "noneMember") {
    errorModel.errorCode = 10002;
    errorModel.message = "用户不存在";
  } else if (err === "passwordWrong") {
    errorModel.errorCode = 10003;
    errorModel.message = "密码错误";
  } else if (err === "requestParamsError") {
    errorModel.errorCode = 10004;
    errorModel.message = "请求参数错误";
  } else if (err === "notmember") {
    errorModel.errorCode = 10005;
    errorModel.message = "禁止游客登录";
  } else if (err === "memberDisabled") {
    errorModel.errorCode = 10006;
    errorModel.message = "用户被禁用";
  } else if (err === "noPermission") {
    errorModel.errorCode = 10007;
    errorModel.message = "用户无权限，请登录";
  } else if (err === "memberExist") {
    errorModel.errorCode = 10008;
    errorModel.message = "用户已存在";
  } else if (err === "uploadFail") {
    errorModel.errorCode = 10009;
    errorModel.message = "上传失败";
  } else if (err === "emptyFile") {
    errorModel.errorCode = 10010;
    errorModel.message = "上传文件为空";
  } else if (err === "unknownFileType") {
    errorModel.errorCode = 10011;
    errorModel.message = "上传文件类型错误";
  }
  return errorModel;
};

