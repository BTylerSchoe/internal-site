

const express 			= require('express');
const router 			= express.Router();

const TechnologyController 	= require('./../controllers/TechnologyController');

const passport      	= require('passport');
const path              = require('path');

// all Technologies routes start with /technologies
router.post(    '/',                        TechnologyController.create);     
router.get(     '/all',                     passport.authenticate('jwt', {session:false}), TechnologyController.getAll);     // R                                               // C
router.get(     "/:technologyId",           passport.authenticate('jwt', {session:false}), TechnologyController.get);        // R
router.put(     '/:technologyId',           passport.authenticate('jwt', {session:false}), TechnologyController.update);     // U
router.delete(  '/',                        passport.authenticate('jwt', {session:false}), TechnologyController.remove);     // D


module.exports = router
