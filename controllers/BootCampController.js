const BootCamp = require('../models').BootCamp;
const bootCampService = require("./../services/BootCampService");

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const body = req.body;
  let err, bootCamp;

  [err, bootCamp] = await to(bootCampService.createBootCamp(body));

  if (err) return ReE(res, err, 422);
  return ReS(
    res,
    {
      message: "Successfully added new bootCamp.",
      bootCamp: bootCamp.toWeb()
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
    //companies: await user.Companies(),
    jwt: user.getJWT()
  });
};
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, bootCamps;
  let user = req.user;
  // let companies = await user.Companies()
  
  [err, bootCamps] = await to(BootCamp.find({}));

  return ReS(res, {
    message: "Successfully retrieved bootCamps.",
    bootCamps
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
  let err, bootCamp, data;
  bootCamp = req.bootCamp;
  data = req.body;
  bootCamp.set(data);

  [err, bootCamp] = await to(bootCamp.save());
  if(err){
      return ReE(res, err);
  }
  return ReS(res, {bootCamp:bootCamp.toWeb()});
}
module.exports.update = update;

// remove bootCamp //
const remove = async function(req, res){
  let bootCamp, err;
  bootCamp = req.bootCamp;

  [err, bootCamp] = await to(bootCamp.remove());
  if(err) return ReE(res, 'error occured trying to delete the bootCamp');

  return ReS(res, {message:'Deleted bootCamp-'}, 204);
}
module.exports.remove = remove;