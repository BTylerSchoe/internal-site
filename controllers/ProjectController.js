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
    Project.findById(req.params.projectId)
    .then(project => {
        if(!project) {
            return ReE(res, {
                message: "project not found with id " + req.params.projectId
            });            
        }
        return ReS(res, {project:project.toWeb()});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return ReE(res, {
                message: "project not found with id " + req.params.projectId
            });                
        }
        return ReE(res, {
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

// Update a project identified by the projectId in the request
const update = async function(req, res){
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "project body can not be empty"
        });
    }

    // Find project and update it with the request body
    Project.findByIdAndUpdate(req.params.projectId, {
        title: req.body.title || "Untitled Project",
        category: req.body.category,
        description: req.body.description,
        member: req.body.member,
        technology: req.body.technology,
        tags: req.body.tags,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    }, {new: true})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });
        }
        return ReS(res,{project:project.toWeb()});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Error updating project with id " + req.params.projectId
        });
    });
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






// // Find a single project with a projectId
// const get = async function(req, res){
    
//     Project.findById(req.params.projectId)
//     [err, project] = await to(ProjectService.deleteProject(body));
//     if(err) return ReE(res, 'error occured trying to delete the project');

//     }
// };
// module.exports.get = get;

