// // PROJECT ROUTES //

// // GET request for displaying list of projects
// router.get('/project', project_controller.project_list_get);

// // GET request for displaying project details
// router.get('/project/details', project_controller.project_details_get);

// // GET request for creating a project
// router.get('/project/create', project_controller.create_project__get);

// // POST request for creating a project
// router.post('/project/create', project_controller.create_project__post);

// // GET request for deleting a project
// router.get('/project/delete', project_controller.delete_project_get);

// // POST request for deleting a project
// router.post('/project/delete', project_controller.delete_project_post);

// // GET request for updating a project
// router.get('/project/update', project_controller.update_project_get);

// // POST request for updating a project
// router.post('/project/update', project_controller.update_project_post);



const express 			= require('express');
const router 			= express.Router();

const ProjectController 	= require('./../controllers/ProjectController');

const passport      	= require('passport');
const path              = require('path');

// all users routes start with /users
router.post(    '/create',           ProjectController.create_project_post);                                                    // C
router.get(     '/read',             passport.authenticate('jwt', {session:false}), ProjectController.get);        // R
router.put(     '/update',           passport.authenticate('jwt', {session:false}), ProjectController.update);     // U
router.delete(  '/delete',           passport.authenticate('jwt', {session:false}), ProjectController.delete_project);     // D


module.exports = router