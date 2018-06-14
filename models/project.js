var moment              = require('moment');
var mongoose            = require('mongoose');
const user              = require('./../models/user');
const bcrypt 			      = require('bcrypt');
const bcrypt_p 			    = require('bcrypt-promise');
const jwt           	  = require('jsonwebtoken');
const validate          = require('mongoose-validator');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema(
  {
    title: {type: String, required: true},
    category: {type: String, required: true},
    member: {type: Schema.ObjectId, ref: 'Member'},
    technology: {type: Schema.ObjectId, ref: 'Technology'},
    start_date: {type: Date,},
    end_date: {type: Date},
  }
);

ProjectSchema.virtual('Project Leader', {
  ref: 'Member',
  localField: '_id',
  foreignField: 'projects.project',
  justOne: false,
});


ProjectSchema.methods.getJWT = function(){
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  return "Bearer "+jwt.sign({id:this._id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
};

ProjectSchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};




//Export model
module.exports = mongoose.model('Project', ProjectSchema);