
// // BOOTCAMP ROUTES //

// // GET request for displaying bootcamp lesson list
// router.get('/bootcamp', book_camp_controller.bootcamp_list_get);

// // GET request for displaying bootcamp lesson instructions
// router.get('/bootcamp/details', book_camp_controller.bootcamp_details_get);

// // Get request for creating a bootcamp
// router.get('/bootcamp/create',boot_camp_contoller.create_bootcamp_get);

// // POST request for creating a bootcamp
// router.post('/bootcamp/create',boot_camp_contoller.create_bootcamp_post);

// // GET request for deleting a bootcamp
// router.get('/bootcamp/delete',boot_camp_contoller.delete_bootcamp_get);

// // POST request for deleting a bootcamp
// router.post('/bootcamp/delete',boot_camp_contoller.delete_bootcamp_post);

// // GET request for updating a bootcamp
// router.get('/bootcamp/update',boot_camp_contoller.update_bootcamp_get);

// // POST request for updating a bootcamp
// router.post('/bootcamp/update',boot_camp_contoller.update_bootcamp_post);










// const express 			= require('express');
// const router 			= express.Router();

// const BootCampController 	= require('./../controllers/BootCampController');

// const passport      	= require('passport');
// const path              = require('path');

// // all users routes start with /users
// router.post(    '/create',           BootCampController.create);                                                    // C
// router.get(     '/read',           passport.authenticate('jwt', {session:false}), BootCampController.get);        // R
// router.put(     '/update',           passport.authenticate('jwt', {session:false}), BootCampController.update);     // U
// router.delete(  '/delete',           passport.authenticate('jwt', {session:false}), BootCampController.remove);     // D



// module.exports = router