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


// const getAccountTypeFromBody = function(body){// this is so they can send in 3 options account_type, email, or phone and it will work
//     let account_type = body.account_type;
//     if(typeof account_type==='undefined'){
//             account_type = null;
//         }

//     return account_type;
// }
// module.exports.getAccountTypeFromBody = getAccountTypeFromBody;


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



// const updateProject = async function(projectInfo){
//     let project, err;

//     if(!projectInfo.title) TE("A Title was not entered.");
//     if(!projectInfo.category) TE("A Category was not selected.");

//     // input sanitization - only enter what's required.
//     const { title, category} = projectInfo;
//     const oldProject = { title, category};

//     [err, project] = await to(Project.update(oldProject));
//     if(err) TE(err.message);

//     return project;
// }
// module.exports.updateProject = updateProject;


// const updateProject = async function(data){

//     let err, project;

//     if(!data.title) TE('A valid project title was not entered, please try again.');
//     if(!data.category) TE('A valid project category was not entered, please try again.');

//     if(data.title && !validator.isLength(data.title, {min: 3, max: 50})) TE("A valid title was not entered.");
//     if(data.category && !validator.isLength(data.category, {min: 3, max: 50})) TE("A valid project category was not entered.");
//     if(data.description && !validator.isLength(data.description, {min: 3, max: 280})) TE("A valid project description was not entered");

//     const { title, category, description} = data;
//     const updatedProject = { title, category, description};



//         [err, project] = await to(Project.update(updatedProject));
//         if(err) TE(err.message);

//     return project;

// }
// module.exports.updateProject = updateProject;
