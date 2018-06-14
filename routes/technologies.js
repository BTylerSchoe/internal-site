// // TECHNOLOGY ROUTES //

// // GET request for displaying technology lesson list
// router.get('/technology', technology_controller.technology_list_get);

// // GET request for displaying technology lesson instructions
// router.get('/technology/details', technology_controller.technology_details_get);

// // Get request for creating a technology
// router.get('/technology/create',technology_contoller.create_technology_get);

// // POST request for creating a technology
// router.post('/technology/create',technology_contoller.create_technology_post);

// // GET request for deleting a technology
// router.get('/technology/delete',technology_contoller.delete_technology_get);

// // POST request for deleting a technology
// router.post('/technology/delete',technology_contoller.delete_technology_post);

// // GET request for updating a technology
// router.get('/technology/update',technology_contoller.update_technology_get);

// // POST request for updating a technology
// router.post('/technology/update',technology_contoller.update_technology_post);


const express 			= require('express');
const router 			= express.Router();

const TechnologyController 	= require('./../controllers/TechnologyController');

const passport      	= require('passport');
const path              = require('path');

// all users routes start with /users
router.post(    '/create',           TechnologyController.create);                                                    // C
router.get(     '/read',           passport.authenticate('jwt', {session:false}), TechnologyController.get);        // R
router.put(     '/update',           passport.authenticate('jwt', {session:false}), TechnologyController.update);     // U
router.delete(  '/delete',           passport.authenticate('jwt', {session:false}), TechnologyController.remove);     // D


module.exports = router
