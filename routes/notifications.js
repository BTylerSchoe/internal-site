
const express 			= require('express');
const router 			= express.Router();

const NotificationController 	= require('./../controllers/NotificationController');

const passport      	= require('passport');
const path              = require('path');

// all notifications routes start with /notifications
 router.post(    '/',                         NotificationController.create);     
 router.get(     '/all',                      passport.authenticate('jwt', {session:false}), NotificationController.getAll);     // R                                               // C
router.get(      '/:notificationId',           passport.authenticate('jwt', {session:false}), NotificationController.get);        // R
router.put(      '/:notificationId',           passport.authenticate('jwt', {session:false}), NotificationController.update);     // U
router.delete(   '/',                          passport.authenticate('jwt', {session:false}), NotificationController.remove);     // D


module.exports = router