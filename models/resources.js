const mongoose 			= require('mongoose');
const jwt           	= require('jsonwebtoken');
const validate          = require('mongoose-validator');



let ResourceSchema = mongoose.Schema({
    title: { type: String, required: true, index: true},
    description: { type: String, required: true},
    url: { type: String, required: true},
    tags: [{ type: String, required: false, index: true }]
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
    collection: "resources"
});

let Resource = module.exports = mongoose.model('Resource', ResourceSchema);

