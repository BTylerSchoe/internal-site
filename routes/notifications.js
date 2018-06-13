
// // NOTIFICATION ROUTES //

// // GET request for displaying list of notifications
// router.get('/notification', notification_controller.notification_list_get);

// // GET request for displaying notification details
// router.get('/notification', notification_controller.details_get);

// // GET request for creating a notification
// router.get('/notification/create', notification_controller.create_notification__get);

// // POST request for creating a notification
// router.post('/notification/create', notification_controller.delete_notification_post);

// // GET request for deleting a notification
// router.get('/notification/delete', notification_controller.create_notification__get);

// // POST request for deleting a notification
// router.post('/notification/delete', notification_controller.delete_notification_post);




// const express 			= require('express');
// const router 			= express.Router();

// const NotificationController 	= require('./../controllers/NotificationController');

// const passport      	= require('passport');
// const path              = require('path');

// // all users routes start with /users
// router.post(    '/create',           NotificationController.create);                                                    // C
// router.get(     '/read',           passport.authenticate('jwt', {session:false}), NotificationController.get);        // R
// router.put(     '/update',           passport.authenticate('jwt', {session:false}), NotificationController.update);     // U
// router.delete(  '/delete',           passport.authenticate('jwt', {session:false}), NotificationController.remove);     // D


// module.exports = router