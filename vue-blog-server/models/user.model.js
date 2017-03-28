var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  String,
  email: String,
  birdthday: { type: Date},
  gender:Number,
  hobby:[],
  brief:String
});

// module.exports = UserSchema;
module.exports = mongoose.model('User', UserSchema);