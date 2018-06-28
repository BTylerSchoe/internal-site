const BootCamp;
const validator     = require('validator');


const createBootCamp = async function(bootCamp){
    let resource, err;

    if(!bootCamp.category) TE("A category was not entered.");
    if(!bootCamp.title) TE("A title was not entered.");
    if(!bootCamp.description) TE("A description was not entered.");
    if(!bootCamp.image_location) TE("A image location was not entered.");
    if(!bootCamp.url) TE("A url was not entered.");
    if(!bootCamp.tags) TE("Tags were not entered.");

    if(bootCamp.title && !validator.isLength(bootCamp.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(bootCamp.description && !validator.isLength(bootCamp.description, {min: 3, max: 280})) TE("A valid description was not entered.");
    if(bootCamp.category && !validator.isLength(bootCamp.category, {min: 3, max: 50})) TE("A valid bootCamp category was not entered.");
    //if(!validator.ispicture.....(bootCamp.url)) TE("A valid url was not entered.");
    if(!validator.isURL(bootCamp.url)) TE("A valid url was not entered.");
    if(bootCamp.tags.length === 0) TE("You must have at least one tag.");

    // input sanitization - only enter what's required.
    const { category, title, description, image_location, url, tags } = bootCamp;
    const newResource = { category, title, description, image_location, url, tags };

    [err, resource] = await to(BootCamp.create(newBootCamp));
    if(err) TE(err.message);

    return resource;
}
module.exports.createBootCamp = createBootCamp;


const deleteBootCamp = async function(bootCampInfo){
    let bootCamp, err;

    if(!bootCampInfo.title) TE("A title was not selected.");
    if(!bootCampInfo.category) TE("A category was not selected.");

    // input sanitization - only enter what's required.
    const { title, category} = bootCampInfo;
    const oldBootCamp = { title, category};

    [err, bootCamp] = await to(bootCamp.remove(oldBootCamp));
    if(err) TE(err.message);

    return bootCamp;
}
module.exports.deletebootCamp = deleteBootCamp;