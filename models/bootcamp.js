const mongoose 			= require('mongoose');


  let BootCampSchema = mongoose.Schema({
      Category: {type: String, required: true},
      title: {type: String, required: true},
      description: {type: String, required: true},
      image_location: {type: String, required: true},
      url: {type: String, required: true},
  }, {timestamps: true});

BootCampSchema.methods.toWeb = function(){
  let json = this.toJSON();
  json.id = this._id;//this is for the front end
  return json;
};

let BootCamp = module.exports = mongoose.model('BootCamp', BootCampSchema);
