
const express 			= require('express');
const router 			= express.Router();

const BootCampController 	= require('./../controllers/BootCampController');

const passport      	= require('passport');
const path              = require('path');

// all bootcamps routes start with /bootcamps
router.post(    '/',              BootCampController.create);                                                    // C
//router.get(     '/',            passport.authenticate('jwt', {session:false}), BootCampController.get);        // R
router.get(     '/all',           passport.authenticate('jwt', {session:false}), BootCampController.getAll);     // R
router.get("/:bootcampId",        passport.authenticate('jwt', {session:false}), BootCampController.get);
// router.put(     '/',           passport.authenticate('jwt', {session:false}), BootCampController.update);     // U
router.delete(  '/',           passport.authenticate('jwt', {session:false}), BootCampController.remove);     // D



module.exports = router