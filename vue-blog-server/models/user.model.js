var mongoose = require('mongoose');
var Schema = mongoose.Schema;//利用mongoose下Schema模型

var UserSchema = new Schema({
  name:  String,
  password: String,
  mail: String,
  city:String,
  birthday: { type: Date},
  gender:String,
  hobby:[],
  brief:String
});

module.exports = mongoose.model('User', UserSchema);