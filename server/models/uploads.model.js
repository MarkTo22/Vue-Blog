var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)

var UploadsSchema = new Schema({
  name: String,
  lastModified: 0,
  lastModifiedDate: { type: Date },
  size: 0,
  type: String,
  date: { type: Date, default: Date.now },
  data: String
});

UploadsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Uploads', UploadsSchema);