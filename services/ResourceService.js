const Resource 			= require('./../models').Resource;
const validator     = require('validator');


const createResource = async function(resourceInfo){
    let resource, err;

    if(!resourceInfo.title) TE("A title was not entered.");
    if(!resourceInfo.description) TE("A description was not entered.");
    if(!resourceInfo.url) TE("A url was not entered.");
    if(!resourceInfo.tags) TE("Tags were not entered.");

    if(resourceInfo.title && !validator.isLength(resourceInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(resourceInfo.description && !validator.isLength(resourceInfo.description, {min: 3, max: 280})) TE("A valid description was not entered.");
    if(!validator.isURL(resourceInfo.url)) TE("A valid url was not entered.");
    if(resourceInfo.tags.length === 0) TE("You must have at least one tag.");

    // input sanitization - only enter what's required.
    const { title, description, url, tags } = resourceInfo;
    const newResource = { title, description, url, tags };

    [err, resource] = await to(Resource.create(newResource));
    if(err) TE(err.message);

    return resource;
}
module.exports.createResource = createResource;

const deleteResource = async function(resourceInfo){
    let resource, err;

    if(!resourceInfo.title) TE("A title was not selected.");


    // input sanitization - only enter what's required.
    const { title } = resourceInfo;
    const oldResource = { title };

    [err, resource] = await to(Resource.remove(oldResource));
    if(err) TE(err.message);

    return resource;
}
module.exports.deleteResource = deleteResource;



const updateResource = async function(resourceInfo, resourceId) {
    let resource, err;

    if(resourceInfo.title && !validator.isLength(resourceInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(resourceInfo.description && !validator.isLength(resourceInfo.description, {min: 3, max: 280})) TE("A valid description was not entered.");
    if(resourceInfo.url && !validator.isURL(resourceInfo.url)) TE("A valid url was not entered.");
    if(resourceInfo.tags && resourceInfo.tags.length === 0) TE("You must have at least one tag.");

    
      const updatedResource = { ...resourceInfo };
  
      [err, resource] = await to(Resource.findOneAndUpdate({_id:resourceId}, updatedResource, {new:true}));
      if(err) TE(err.message);

      return resource;
}
module.exports.updateResource = updateResource;

