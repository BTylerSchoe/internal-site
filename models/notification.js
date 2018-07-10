const mongoose 			= require('mongoose');
const jwt           	= require('jsonwebtoken');
const validate          = require('mongoose-validator');



let NotificationSchema = mongoose.Schema({
    title: { type: String, required: false, index: true},
    subject: { type: String, required: false},
    message: { type: String},
    content: {type: String}
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
    collection: "notifications"
});

NotificationSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let Notification = (module.exports = mongoose.model('Notifications', NotificationSchema));