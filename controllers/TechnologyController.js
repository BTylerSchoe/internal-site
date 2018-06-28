const Technology = require('../models').Technology;
const technologyService = require("./../services/TechnologyService");

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const body = req.body;
  let err, technology;

  [err, technology] = await to(technologyService.createTechnology(body));

  if (err) return ReE(res, err, 422);
  return ReS(
    res,
    {
      message: "Successfully added new technology.",
      technology: technology.toWeb()
    },
    201
  );
};
module.exports.create = create;


// const get = async function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     let err, technology;
//     [err, technology] = await to(technology.find({}));

//     return ReS(res, {
//         message: "Successfully retrieved technology.",
//         technology
//       });
//     };
//     module.exports.get = get;


// Find a single technology with a technologyId
const get = async function(req, res){
  Technology.findById(req.params.technologyId)
  .then(technology => {
      if(!technology) {
          return ReS(res, {
              message: "technology not found with id " + req.params.technologyId
          });            
      }
      res.send(technology);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return ReS(res, {
              message: "technology not found with id " + req.params.technologyId
          });                
      }
      return ReS(res, {
          message: "Error retrieving technology with id " + req.params.technologyId
      });
  });
};
module.exports.get = get;

const getAll = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let technology = req.technology;
  let err, technologies;
  [err, technologies] = await to(Technology.find());

  return ReS(res, {
      message: "Successfully retrieved technologys.",
      technologies
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
  let err, technology, data;
  technology = req.technology;
  data = req.body;
  technology.set(data);

  [err, technology] = await to(technology.save());
  if(err){
      return ReE(res, err);
  }
  return ReS(res, {technology:technology.toWeb()});
}
module.exports.update = update;



// remove technology //
const remove = async function(req, res){
    let body, err, technology;
    body = req.body;

    console.log(technologyService.deleteTechnology(body));
    [err, technology] = await to(technologyService.deleteTechnology(body));
    if(err) return ReE(res, 'error occured trying to delete the technology');
  
    return ReS(res, {message:'Deleted technology-'}, 204);
  }
  module.exports.remove = remove;