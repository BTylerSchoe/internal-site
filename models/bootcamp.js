var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BootcampSchema = new Schema(
  {
    Category: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    image_location: {type: String, required: true},
    url: {type: String, required: true},
  }
);




//Export model
module.exports = mongoose.model('Bootcamp', BootcampSchema);