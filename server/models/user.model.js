var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)

var UserSchema = new Schema({
  name: String,
  password: String,
  mail: String,
  city: String,
  date: { type: Date },
  gender: String,
  interest: [],
  desc: String
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);