const mongoose       = require('mongoose');
const bcrypt 			   = require('bcrypt');
const bcrypt_p 		 	 = require('bcrypt-promise');
const jwt            = require('jsonwebtoken');
const validate       = require('mongoose-validator');
const Project        = require('./project');



const enumAccountType = ['a', 'r', 'i'];

let MemberSchema = mongoose.Schema({
    first_name: {type: String, required: true, max: 25},
    last_name: {type: String, required: true, max: 30},
    email: {type:String, lowercase:true, trim: true, index: true, unique: true, sparse: true,
      validate:[validate({
          validator: 'isEmail',
          message: 'Not a valid email.',
      })]
},
    password: {type: String, required: true, max: 25},
    account_type: {type: String, enum: enumAccountType, required: true},

  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
    timestamps: true
  });


// virtual field for full name 
MemberSchema.virtual('full_name').set(function (name) {
    var split = name.split(' ');
    this.first_name = split[0];
    this.last_name = split[1];
});

MemberSchema.virtual('full_name').get(function () { //now you can treat as if this was a property instead of a function
    if(!this.first_name) return null;
    if(!this.last_name) return this.first_name;

    return this.first_name + ' ' + this.last_name;
});


MemberSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'member',
  justOne: false,
});

MemberSchema.pre('save', async function(next){

  if(this.isModified('password') || this.isNew){

      let err, salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if(err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(this.password, salt));
      if(err) TE(err.message, true);

      this.password = hash;

  } else{
      return next();
  }
})

MemberSchema.methods.comparePassword = async function(pw){
  let err, pass;
  if(!this.password) TE('password not set');

  [err, pass] = await to(bcrypt_p.compare(pw, this.password));
  if(err) TE(err);

  if(!pass) TE('invalid password');

  return this;
}

MemberSchema.methods.Projects = async function(){
  let err, projects;
  [err, projects] = await to(Project.find({'members.member':this._id}));
  if(err) TE('err getting projects');
  console.log("Projects")
  console.log(projects)
  return projects;
}

MemberSchema.methods.getJWT = function(){
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  return "Bearer "+jwt.sign({id:this._id, account_type: this.account_type}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
};

MemberSchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};


//Export model
module.exports = mongoose.model('Member', MemberSchema);