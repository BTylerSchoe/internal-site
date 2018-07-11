const Project 	= require('./../models').Project;
const validator = require('validator');
const Member    = require('./../models').Member;


const createProject = async function(projectInfo){
    let project, err;

    if(!projectInfo.title) TE("A title was not entered.");
    if(!projectInfo.category) TE("A category was not entered.");
    if(!projectInfo.description) TE("A project description was not entered");
    if(!projectInfo.tags) TE("Tags were not entered.");
    

    if(projectInfo.title && !validator.isLength(projectInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(projectInfo.category && !validator.isLength(projectInfo.category, {min: 3, max: 50})) TE("A valid project category was not entered.");
    if(projectInfo.description && !validator.isLength(projectInfo.description, {min: 3, max: 280})) TE("A valid project description was not entered");

    // input sanitization - only enter what's required.
    const { title, category, description} = projectInfo;
    const newProject = { title, category, description};

    [err, project] = await to(Project.create(newProject));
    if(err) TE(err.message);

    return project;
}
module.exports.createProject = createProject;


const deleteProject = async function(projectInfo){
    let project, err;

    if(!projectInfo.title) TE("A title was not selected.");
    if(!projectInfo.category) TE("A category was not selected.");

    // input sanitization - only enter what's required.
    const { title, category} = projectInfo;
    const oldProject = { title, category};

    [err, project] = await to(Project.remove(oldProject));
    if(err) TE(err.message);

    return project;
}
module.exports.deleteProject = deleteProject;


const updateProject = async function(projectInfo, projectId) {
    let project, err;

    if(projectInfo.title && !validator.isLength(projectInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(projectInfo.description && !validator.isLength(projectInfo.description, {min: 3, max: 280})) TE("A valid description was not entered.");
    if(projectInfo.url && !validator.isURL(projectInfo.url)) TE("A valid url was not entered.");
    if(projectInfo.tags && projectInfo.tags.length === 0) TE("You must have at least one tag.");

    
      const updatedProject = { ...projectInfo };
  
      [err, project] = await to(Project.findOneAndUpdate({_id:projectId}, updatedProject, {new:true}));
      if(err) TE(err.message);

      return project;
}
module.exports.updateProject = updateProject;
