const Bootcamp = require('./../models').Bootcamp;
const bootcampService = require("./../services/BootCampService");

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const body = req.body;
  let err, bootCamp;

  [err, bootCamp] = await to(bootcampService.createBootCamp(body));

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

// Find a single bootcamp with a bootcampId
const get = async function(req, res){

  let err, bootcamp;

  [err, bootcamp] = await to(Bootcamp.findOne({_id: req.params.bootcampId}));

  if (err) return ReE(res, err.message, 422);
  if (bootcamp) {
      return ReS(
          res,
          {
            message: "Successfully retrieved bootcamp.",
            bootcamp: bootcamp.toWeb()
          },
          201
        );
      }
    };
  
  module.exports.get = get;


const getAll = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let member = req.member;
  let err, bootcamps;
  [err, bootcamps] = await to(Bootcamp.find());

  return ReS(res, {
      message: "Successfully retrieved bootcamps.",
      bootcamps
    });
  };
  module.exports.getAll = getAll;

// Update a bootcamp identified by the bootcampId in the request
const update = async function(req, res){
    res.setHeader("Content-Type", "application/json");
    const Id = req.params.bootcampId;
    const body = req.body;
    let err, bootcamp;
    

    [err, bootcamp] = await to(bootcampService.updateBootcamp(body, Id));


    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully updated bootcamp.",
        bootcamp: bootcamp.toWeb()
      },
      201
    );
  };
module.exports.update = update;


// remove bootcamp //
const remove = async function(req, res){
    let body, err;
    body = req.body;

    [err, bootcamp] = await to(bootcampService.deleteBootCamp(body));
    if(err) return ReE(res, 'error occured trying to delete the bootcamp');
  
    return ReS(res, {message:'Deleted bootcamp-'}, 204);
  }
  module.exports.remove = remove;