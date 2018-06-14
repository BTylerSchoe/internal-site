var express = require('express');
var router = express.Router();

// Require controller modules.
var member_controller = require('../controllers/memberController');



const express 			= require('express');
const router 			= express.Router();

const MemberController 	= require('./../controllers/MemberController');

const passport      	= require('passport');
const path              = require('path');

// all users routes start with /users
router.post(    '/create',           MemberController.create);                                                    // C
router.get(     '/read',             passport.authenticate('jwt', {session:false}), MemberController.get);        // R
router.put(     '/update',           passport.authenticate('jwt', {session:false}), MemberController.update);     // U
router.delete(  '/delete',           passport.authenticate('jwt', {session:false}), MemberController.delete);     // D


module.exports = router


























module.exports = router;