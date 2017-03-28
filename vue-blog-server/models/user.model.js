var mongoose = require('mongoose');
var Schema = mongoose.Schema;//利用mongoose下Schema模型

var UserSchema = new Schema({
  username:  String,
  email: String,
  city:String,
  birdthday: { type: Date},
  gender:Number,
  hobby:[],
  brief:String
});

module.exports = mongoose.model('User', UserSchema);