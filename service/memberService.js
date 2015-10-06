var mongoose = require("./util/mongoUtil.js").createClient(),
  memberSchema = require("./schemas/memberSchema.js"),
  jwt = require("jsonwebtoken"),
  config = require("../config.js"),
  errorUtil = require("./util/errorUtil.js");
var Member = mongoose.model('Member', memberSchema.createSchema);
module.exports = {
  create: function (data, responce, error) {
    var token = jwt.sign({deviceId:data.deviceId},config.secret);
    data.token = token;
    var memberModel = new Member(data);
    memberModel.save(function (err, product, numberAffected) {
      if (err) {
        error(errorUtil(err));
      } else {
        responce(product);
      }
    })
  },
  findOne: function (data, responce, error) {
    Member.findOne(data, function (err, product, numberAffected) {
      if (err) {
        error(errorUtil(err));
      } else {
        responce(product);
      }
    })
  },
  update: function (data, responce, error) {
    var that = this;
    Member.findByIdAndUpdate(data._id, {$set: data}, function (err, rawResponse) {
      if (err) {
        error(errorUtil(err));
      } else {
        if (!rawResponse){
          error(errorUtil("noneMember"));
          return;
        }
        that.findOne({_id:rawResponse._id},function(resData){
          responce(resData);
        },function(e){
          error(errorUtil(e));
        });
      }
    });
  }
};
