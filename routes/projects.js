
const express 			= require('express');
const router 			= express.Router();

const ProjectController 	= require('./../controllers/ProjectController');

const passport      	= require('passport');
const path              = require('path');

// all users routes start with /users
router.post(    '/create',           ProjectController.create_project_post);                                                    // C
// router.get(     '/read',             passport.authenticate('jwt', {session:false}), ProjectController.get);        // R
// router.put(     '/update',           passport.authenticate('jwt', {session:false}), ProjectController.update);     // U
// router.delete(  '/delete',           passport.authenticate('jwt', {session:false}), ProjectController.delete);     // D


module.exports = router