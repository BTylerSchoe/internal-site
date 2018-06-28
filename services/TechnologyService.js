const Technology 			= require('./../models').Technology;
const validator     = require('validator');


const createTechnology = async function(technologyInfo){
    let technology, err;

    if(!technologyInfo.title) TE("A title was not entered.");
    if(!technologyInfo.description) TE("A description was not entered.");
    if(!technologyInfo.url) TE("A url was not entered.");
    if(!technologyInfo.tags) TE("Tags were not entered.");

    if(technologyInfo.title && !validator.isLength(technologyInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(technologyInfo.description && !validator.isLength(technologyInfo.description, {min: 3, max: 280})) TE("A valid description was not entered.");
    if(!validator.isURL(technologyInfo.url)) TE("A valid url was not entered.");
    if(technologyInfo.tags.length === 0) TE("You must have at least one tag.");

    // input sanitization - only enter what's required.
    const { title, description, url, tags } = technologyInfo;
    const newTechnology = { title, description, url, tags };

    [err, technology] = await to(Technology.create(newTechnology));
    if(err) TE(err.message);

    return technology;
}
module.exports.createTechnology = createTechnology;



const deleteTechnology = async function(technologyInfo){
    let technology, err;

    if(!technologyInfo.title) TE("A title was not selected.");
    //if(!technologyInfo.category) TE("A category was not selected.");

    // input sanitization - only enter what's required.
    const { title, category} = technologyInfo;
    const oldTechnology = { title, category};

    [err, technology] = await to(Technology.remove(oldTechnology));
    if(err) TE(err.message);

    return technology;
}
module.exports.deleteTechnology = deleteTechnology;
