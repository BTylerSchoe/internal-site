const jwt           	= require('jsonwebtoken');
const validate          = require('mongoose-validator');
const mongoose            = require('mongoose');
const member              = require('./../models/member');
//const technology = require('./../models/Technology');


let ProjectSchema = mongoose.Schema(
  {
    title: {type: String, unique: true, required: true},
    category: {type: String, required: true},
    description: {type: String, require: true},
    member: {type: mongoose.Schema.ObjectId, ref: 'Member'},
    technology: {type: mongoose.Schema.ObjectId, ref: 'Technology'},
    tags: [{ type: String, required: false, index: true }],
    start_date: {type: Date,},
    end_date: {type: Date},
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
    collection: "projects"
});

ProjectSchema.methods.Members = async function(){
  let err, members;
  [err, members] = await to(Members.find({'members.member':this._id}));
  if(err) TE('err getting members');
  console.log("Members")
  console.log(members)
  return members;
}

ProjectSchema.methods.Technologies = async function(){
  let err, technologies;
  [err, members] = await to(Technologies.find({'technologies.technology':this._id}));
  if(err) TE('err getting technologies');
  console.log("Technologies")
  console.log(technologies)
  return technologies;
}

ProjectSchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};

//Export Model
let Project = (module.exports = mongoose.model('Projects', ProjectSchema));




