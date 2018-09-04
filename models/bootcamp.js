const mongoose 			= require('mongoose');
const jwt           	= require('jsonwebtoken');
const validate          = require('mongoose-validator');



let BootCampSchema = mongoose.Schema({
    title: { type: String, required: false, index: true},
    category: {type: String, required: true},
    description: { type: String, required: false},
    image_location: { type: String, required: true},
    url: {type: String, required: true}
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
    collection: "bootCamps"
});

BootCampSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let Bootcamp = (module.exports = mongoose.model('Bootcamps', BootCampSchema));
