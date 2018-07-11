const Project = require('../models').Project;
const projectService = require("./../services/ProjectService");

const create = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    const body = req.body;
    let err, project;
  
    [err, project] = await to(projectService.createProject(body));
  
    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully added new project.",
        project: project.toWeb()
      },
      201
    );
};
module.exports.create = create;

// Find a single project with a projectId
    const get = async function(req, res){

        let err, project;

        [err, project] = await to(Project.findOne({_id: req.params.projectId}));

        if (err) return ReE(res, err.message, 422);
        if (project) {
            return ReS(
                res,
                {
                  message: "Successfully retrieved project.",
                  project: project.toWeb()
                },
                201
              );
            }
          };
        
        module.exports.get = get;


const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let member = req.member;
    let err, projects;
    [err, projects] = await to(Project.find());

    return ReS(res, {
        message: "Successfully retrieved projects.",
        projects
      });
    };
    module.exports.getAll = getAll;



   // Update a project identified by the projectId in the request
const update = async function(req, res){
    res.setHeader("Content-Type", "application/json");
    const Id = req.params.projectId;
    const body = req.body;
    let err, project;
    

    [err, project] = await to(projectService.updateProject(body, Id));


    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully updated project.",
        project: project.toWeb()
      },
      201
    );
  };
module.exports.update = update;



// remove project //
const remove = async function(req, res){
    let body, err;
    body = req.body;

    [err, project] = await to(projectService.deleteProject(body));
    if(err) return ReE(res, 'error occured trying to delete the project');
  
    return ReS(res, {message:'Deleted project-'}, 204);
  }
  module.exports.remove = remove;




