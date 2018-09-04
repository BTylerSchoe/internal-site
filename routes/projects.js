const express 			= require('express');
const router 			= express.Router();

const ProjectController 	= require('./../controllers/ProjectController');

const passport      	= require('passport');
const path              = require('path');

// all projects routes start with /projects
router.post(    '/',                       ProjectController.create);  //REMOVE CREATE,READ,ETC.                                                  // C    // R
router.get(     '/all',                    passport.authenticate('jwt', {session:false}), ProjectController.getAll); // R
router.get(     '/:projectId',             passport.authenticate('jwt', {session:false}), ProjectController.get);
router.put(     '/:projectId',             passport.authenticate('jwt', {session:false}), ProjectController.update);     // U
router.get(     '/:projectId',             passport.authenticate('jwt', {session:false}), ProjectController.getMembersByProject); 
router.delete(  '/',                       passport.authenticate('jwt', {session:false}), ProjectController.remove);     // D


module.exports = router

//passport.authenticate('jwt', {session:false}), 