const Project = require('../models').Project;
const validator = require('validator');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.unique_key && ! body.title){
        return ReE(res, 'Please enter a title to create a project');
    } else if(!body.category){
        return ReE(res, 'Please enter a category to create a project');
    }else{
        let err, member;

        [err, member] = await to(authService.createProject(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created a new project.', member:member.toWeb(), token:member.getJWT()}, 201);
    }
}
module.exports.create = create;

// Jesus loves Brayden

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let member = req.member;
    let err, projects;
    [err, projects] = await to(member.Projects());

    let projects_json = []
    for (let i in projects){
        let project = projects[i];
        projects_json.push(project.toWeb())
    }
    return ReS(res, {projects: projects_json});
}
module.exports.getAll = getAll;



const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let project = req.project;
    return ReS(res, {project:project.toWeb()});
}
module.exports.get = get;



const update = async function(req, res){
    let err, project, data;
    project = req.project;
    data = req.body;
    project.set(data);

    [err, project] = await to(project.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {project:project.toWeb()});
}
module.exports.update = update;



const remove = async function(req, res){
    let project, err;
    project = req.project;

    [err, project] = await to(project.remove());
    if(err) return ReE(res, 'error occured trying to delete the project');

    return ReS(res, {message:'Deleted Project-'}, 204);
}
module.exports.remove = remove;



// Display Member create form on GET.
exports.create_project_post = async function(req, res, next) {     
    res.setHeader('Content-Type', 'application/json'); 
    
    const body = req.body;
    let err, member, project;

    if(!body.title) return ReE(res, "A Project title was not entered. Please enter a Project title");
    if(!body.category) return ReE(res, "A Project category was not entered. Please enter a Project Category");

    if(!validator.isLength(body.title, {min: 3, max: 50})) return ReE(res, "A valid project title was not entered.");
    if(!validator.isLength(body.category, {min: 3, max: 50})) return ReE(res, "A valid project category was not entered.");

    // input sanitization - only enter what's required.
    const { title, category} = body;
    const projectInfo = {
        title,
        category,
    };

    [err, project] = await to(Project.create(projectInfo));
    // console.log(err)
    // console.log(member)
    if(err) return ReE(res, err.message);

    return ReS(res, {message: 'successfully created a new project', token: project.getJWT(), project: project.toWeb() });
};



// // Display Member create form on GET.
// exports.delete_project = async function(req, res, next) {     
//     res.setHeader('Content-Type', 'application/json'); 
    
//     const body = req.body;
//     let err, member, project;
//     project = body.project;

//     if(!body.title) return ReE(res, "A Project title was not entered. Please enter a Project title");
//     if(!body.category) return ReE(res, "A Project category was not entered. Please enter a Project Category");

    
//     // input sanitization - only enter what's required.
//     const { title, category} = body;
//     const projectInfo = {
//         title,
//         category,
//         member,
//         technologies,
//         start_date,
//         end_date,
//     };

//     [err, project] = await to(Project.remove(projectInfo));
//     // console.log(err)
//     // console.log(member)
//     if(err) return ReE(res, err.message);

//     return ReS(res, {message: 'successfully deleted the project'});
// };




