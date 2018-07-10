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
  Bootcamp.findById(req.params.bootcampId)
  .then(bootcamp => {
      if(!bootcamp) {
          return ReS(res, {
              message: "bootcamp not found with id " + req.params.bootcampId
          });            
      }
      res.send(bootcamp);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return ReS(res, {
              message: "bootcamp not found with id " + req.params.bootcampId
          });                
      }
      return ReS(res, {
          message: "Error retrieving bootcamp with id " + req.params.bootcampId
      });
  });
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
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "bootcamp body can not be empty"
        });
    }
  // Find bootcamp and update it with the request body
  Bootcamp.findByIdAndUpdate(req.params.bootcampId, {
    title: req.body.title || "Untitled Bootcamp",
    category: req.body.category,
    image: req.body.image,
    url: req.body.url
}, {new: true})
.then(bootcamp => {
    if(!bootcamp) {
        return res.status(404).send({
            message: "Bootcamp not found with id " + req.params.bootcampId
        });
    }
    return ReS(res,{bootcamp:bootcamp.toWeb()});
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Bootcamp not found with id " + req.params.bootcampId
        });                
    }
    return res.status(500).send({
        message: "Error updating Bootcamp with id " + req.params.bootcampId
    });
});
};
module.exports.update = update;

// const update = async function(req, res){
//   let err, bootCamp, data;
//   bootCamp = req.bootCamp;
//   data = req.body;
//   bootCamp.set(data);

//   [err, bootCamp] = await to(bootCamp.save());
//   if(err){
//       return ReE(res, err);
//   }
//   return ReS(res, {bootCamp:bootCamp.toWeb()});
// }
// module.exports.update = update;

// remove bootcamp //
const remove = async function(req, res){
    let body, err;
    body = req.body;

    [err, bootcamp] = await to(bootcampService.deleteBootCamp(body));
    if(err) return ReE(res, 'error occured trying to delete the bootcamp');
  
    return ReS(res, {message:'Deleted bootcamp-'}, 204);
  }
  module.exports.remove = remove;