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

  let err, resource;

  [err, resource] = await to(Resource.findOne({_id: req.params.resourceId}));

  if (err) return ReE(res, err.message, 422);
  if (resource) {
      return ReS(
          res,
          {
            message: "Successfully retrieved resource.",
            resource: resource.toWeb()
          },
          201
        );
      }
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
    res.setHeader("Content-Type", "application/json");
    const Id = req.params.resourceId;
    const body = req.body;
    let err, resource;
    

    [err, resource] = await to(resourceService.updateResource(body, Id));


    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully updated resource.",
        resource: resource.toWeb()
      },
      201
    );
  };
module.exports.update = update;


// remove resource //
const remove = async function(req, res){
  res.setHeader("Content-Type", "application/json");
  let body, err;
  body = req.body;

  [err, resource] = await to(resourceService.deleteResource(body));
  if(err) return ReE(res, 'error occured trying to delete the resource');

  return ReS(res, {message:'Deleted resource-'}, 204);
}
module.exports.remove = remove;