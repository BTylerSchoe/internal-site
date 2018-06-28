const mongoose 			    = require('mongoose');
const jwt           	  = require('jsonwebtoken');
const validate          = require('mongoose-validator');

let TechnologySchema = mongoose.Schema({
  title: { type: String, required: false, index: true},
  description: { type: String, required: false},
  url: { type: String, unique: true, required: true},
  tags: [{ type: String, required: false, index: true }]
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  strict: true,
  collection: "Technology"
});


TechnologySchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};

let Technology = (module.exports = mongoose.model('Technology', TechnologySchema));


// // Virtual for Technology's URL
// TechnologySchema
// .virtual('url')
// .get(function () {
//   return '/v1/Technology/' + this._id;
// });
