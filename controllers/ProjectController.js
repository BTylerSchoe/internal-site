const Project = require('../models').Project;
const ProjectService = require("./../services/ProjectService");

const create = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    const body = req.body;
    let err, project;
  
    [err, project] = await to(ProjectService.createProject(body));
  
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
    Project.findById(req.params.projectId)
    .then(project => {
        if(!project) {
            return ReS(res, {
                message: "project not found with id " + req.params.projectId
            });            
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return ReS(res, {
                message: "project not found with id " + req.params.projectId
            });                
        }
        return ReS(res, {
            message: "Error retrieving project with id " + req.params.projectId
        });
    });
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


const update = async function(req, res){
    let err, project, data;
    project = req.params.projectId;
    console.log(project);
    data = req.body;
    console.log(data);
    ProjectService.set(data);

    [err, Project] = await to(Project.save(data.title));
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {Project:Project.toWeb()});
}
module.exports.update = update;



// remove project //
const remove = async function(req, res){
    let body, err;
    body = req.body;

    [err, project] = await to(ProjectService.deleteProject(body));
    if(err) return ReE(res, 'error occured trying to delete the project');
  
    return ReS(res, {message:'Deleted project-'}, 204);
  }
  module.exports.remove = remove;






// // Find a single project with a projectId
// const get = async function(req, res){
    
//     Project.findById(req.params.projectId)
//     [err, project] = await to(ProjectService.deleteProject(body));
//     if(err) return ReE(res, 'error occured trying to delete the project');

//     }
// };
// module.exports.get = get;

