const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');

const passport      	= require('passport');
const path              = require('path');

// all users routes start with /users
router.post(    '/',           UserController.create);                                                    // C
router.get(     '/',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/login',      UserController.login);


module.exports = router