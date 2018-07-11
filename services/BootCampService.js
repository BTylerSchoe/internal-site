
const Bootcamp 	    = require('./../models').Bootcamp;
const validator     = require('validator');


const createBootCamp = async function(bootcampInfo){
    let bootcamp, err;

    if(!bootcampInfo.title) TE("A title was not entered.");
    if(!bootcampInfo.category) TE("A category was not entered.");
    if(!bootcampInfo.description) TE("A bootcamp description was not entered");
    if(!bootcampInfo.image_location) TE("A valid image_location not entered.");
    if(!bootcampInfo.url) TE("A valid url was not entered.");
    

    if(bootcampInfo.title && !validator.isLength(bootcampInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(bootcampInfo.category && !validator.isLength(bootcampInfo.category, {min: 3, max: 50})) TE("A valid bootcamp category was not entered.");
    if(bootcampInfo.description && !validator.isLength(bootcampInfo.description, {min: 3, max: 280})) TE("A valid bootcamp description was not entered");

    // input sanitization - only enter what's required.
    const { title, category, description, image_location, url} = bootcampInfo;
    const newBootCamp = { title, category, description, image_location, url};

    
    [err, bootcamp] = await to(Bootcamp.create(newBootCamp));
    if(err) TE(err.message);

    return bootcamp;
}
module.exports.createBootCamp = createBootCamp;




const deleteBootCamp = async function(bootCampInfo){
    let bootCamp, err;

    if(!bootCampInfo.title) TE("A title was not selected.");
    if(!bootCampInfo.category) TE("A category was not selected.");

    // input sanitization - only enter what's required.
    const { title, category} = bootCampInfo;
    const oldBootCamp = { title, category};

    [err, bootCamp] = await to(Bootcamp.remove(oldBootCamp));
    if(err) TE(err.message);

    return bootCamp;
}
module.exports.deleteBootCamp = deleteBootCamp;


const updateBootcamp = async function(bootcampInfo, bootcampId) {
    let bootcamp, err;

    if(bootcampInfo.title && !validator.isLength(bootcampInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(bootcampInfo.category && !validator.isLength(bootcampInfo.category, {min: 3, max: 50})) TE("A valid bootcamp category was not entered.");
    if(bootcampInfo.description && !validator.isLength(bootcampInfo.description, {min: 3, max: 280})) TE("A valid bootcamp description was not entered");

    
      const updatedBootcamp = { ...bootcampInfo };
  
      [err, bootcamp] = await to(Bootcamp.findOneAndUpdate({_id:bootcampId}, updatedBootcamp, {new:true}));
      if(err) TE(err.message);

      return bootcamp;
}
module.exports.updateBootcamp = updateBootcamp;