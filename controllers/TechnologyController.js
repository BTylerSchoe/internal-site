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




// Find a single technology with a technologyId
const get = async function(req, res){

    let err, technology;

    [err, technology] = await to(Technology.findOne({_id: req.params.technologyId}));

    if (err) return ReE(res, err.message, 422);
    if (technology) {
        return ReS(
            res,
            {
              message: "Successfully retrieved technology.",
              technology: technology.toWeb()
            },
            201
          );
        }
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

// Update a technology identified by the technologyId in the request
const update = async function(req, res){
    res.setHeader("Content-Type", "application/json");
    const Id = req.params.technologyId;
    const body = req.body;
    let err, technology;
    

    [err, technology] = await to(technologyService.updateTechnology(body, Id));


    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully updated technology.",
        technology: technology.toWeb()
      },
      201
    );
  };
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