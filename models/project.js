const mongoose            = require('mongoose');
const member              = require('./../models/member');
//const technology = require('./../models/technology');


let ProjectSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    category: {type: String, required: true},
    member: {type: mongoose.Schema.ObjectId, ref: 'Member'},
    technology: {type: mongoose.Schema.ObjectId, ref: 'Technology'},
    start_date: {type: Date,},
    end_date: {type: Date},
  }, {timestamps: true});

// shows the project leader will need to search based off of account_type??
ProjectSchema.virtual('Project Leader', {
  ref: 'Member',
  localField: '_id',
  foreignField: 'projects.project',
  justOne: false,
});


ProjectSchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};




//Export model
module.exports = mongoose.model('Project', ProjectSchema);