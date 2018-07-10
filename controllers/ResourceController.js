const Resource = require('../models').Resource;
const resourceService = require("./../services/ResourceService");

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const body = req.body;
  let err, resource;

  [err, resource] = await to(resourceService.createResource(body));

  if (err) return ReE(res, err, 422);
  return ReS(
    res,
    {
      message: "Successfully added new resource.",
      resource: resource.toWeb()
    },
    201
  );
};
module.exports.create = create;


// Find a single resource with a resourceId
const get = async function(req, res){
  Resource.findById(req.params.resourceId)
  .then(resource => {
      if(!resource) {
          return ReS(res, {
              message: "resource not found with id " + req.params.resourceId
          });            
      }
      res.send(resource);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return ReS(res, {
              message: "resource not found with id " + req.params.resourceId
          });                
      }
      return ReS(res, {
          message: "Error retrieving resource with id " + req.params.resourceId
      });
  });
};
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, resources;
  let member = req.member;
  // let companies = await member.Companies()
  
  [err, resources] = await to(Resource.find({}));

  return ReS(res, {
    message: "Successfully retrieved resources.",
    resources
  });
};
module.exports.getAll = getAll;

const getByTag = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log("hello");
  let member = req.member;
  // let companies = await member.Companies()

  return ReS(res, {
    member: member.toWeb(),
    companies: await member.Companies(),
    jwt: member.getJWT()
  });
};
module.exports.getAll = getAll;

// Update a resource identified by the resourceId in the request
const update = async function(req, res){
  // Validate Request
  if(!req.body) {
      return res.status(400).send({
          message: "resource body can not be empty"
      });
  }

  // Find resource and update it with the request body
  Resource.findByIdAndUpdate(req.params.resourceId, {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    tags: req.body.tags
  }, {new: true})
  .then(resource => {
      if(!resource) {
          return res.status(404).send({
              message: "resource not found with id " + req.params.resourceId
          });
      }
      return ReS(res,{resource:resource.toWeb()});
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "resource not found with id " + req.params.resourceId
          });                
      }
      return res.status(500).send({
          message: "Error updating resource with id " + req.params.resourceId
      });
  });
};
module.exports.update = update;

// const update = async function(req, res){
//   let err, resource, data;
//   resource = req.resource;
//   data = req.body;
//   resource.set(data);

//   [err, resource] = await to(resource.save());
//   if(err){
//       return ReE(res, err);
//   }
//   return ReS(res, {resource:resource.toWeb()});
// }
// module.exports.update = update;

// remove resource //
const remove = async function(req, res){
  let body, err;
  body = req.body;

  [err, resource] = await to(resourceService.deleteResource(body));
  if(err) return ReE(res, 'error occured trying to delete the resource');

  return ReS(res, {message:'Deleted resource-'}, 204);
}
module.exports.remove = remove;