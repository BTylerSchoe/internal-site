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

const get = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log("hello");
  let user = req.user;
  // let companies = await user.Companies()

  return ReS(res, {
    user: user.toWeb(),
    companies: await user.Companies(),
    jwt: user.getJWT()
  });
};
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, resources;
  let user = req.user;
  // let companies = await user.Companies()
  
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
  let user = req.user;
  // let companies = await user.Companies()

  return ReS(res, {
    user: user.toWeb(),
    companies: await user.Companies(),
    jwt: user.getJWT()
  });
};
module.exports.getAll = getAll;

const update = async function(req, res){
  let err, resource, data;
  resource = req.resource;
  data = req.body;
  resource.set(data);

  [err, resource] = await to(resource.save());
  if(err){
      return ReE(res, err);
  }
  return ReS(res, {resource:resource.toWeb()});
}
module.exports.update = update;

// remove resource //
const remove = async function(req, res){
  let resource, err;
  resource = req.resource;

  [err, resource] = await to(resource.remove());
  if(err) return ReE(res, 'error occured trying to delete the resource');

  return ReS(res, {message:'Deleted resource-'}, 204);
}
module.exports.remove = remove;