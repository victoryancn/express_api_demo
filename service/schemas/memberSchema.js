/**
 * Created by victoryan on 15/9/28.
 */

var mongoose = require("../util/mongoUtil.js").createClient();
var Schema = mongoose.Schema;
module.exports =  {
  createSchema : new Schema({
      username: {
        type : String ,
        default : "游客"
      },
      password: {
        type : String ,
        default : Math.random().toString(36).substr(2)
      },
      mobile: {
        type:String,
        default : "00000000000"
      },
      deviceId: {
       type:String,
       required: true
      },
      deviceType: {
       type:String,
       required: true
      },
      createTime: {
        type: Date,
        default: Date.now
      },
      UpdateTime: {
       type: Date,
       default: Date.now
      },
      token : {
        type : String,
        require :true
      },
      enable : {
        type : Boolean,
        default : true
      }
    }
  ),
  findSchema : new Schema({
    mobile: {
      type: String,
      required : true
    },
    password : {
      type: String,
      required: true
    }
  }),


}
