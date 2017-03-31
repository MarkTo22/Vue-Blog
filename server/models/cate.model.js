var mongoose = require('mongoose'),
    materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/materialized');

var CateSchema = new Schema({
  title: {type: String}
});


CateSchema.plugin(materializedPlugin);
module.exports = mongoose.model('Cate', CateSchema); // Category