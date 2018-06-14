var express = require('express');
var router = express.Router();

// Require controller modules.
var member_controller = require('../controllers/memberController');
// var project_controller = require('../controllers/projectController');
// var technology_controller = require('../controllers/technologyController');
// var boot_camp_controller = require('../controllers/bootcampController');
// var notification_controller = require('../controllers/notificationController')


/// MEMBER ROUTES ///

// GET index home page
// router.get('/', member_controller.index);

// GET request for diplaying member details
router.get('/', member_controller.member_details_get);

// GET request for diplaying member list
router.get('/list', member_controller.member_list_get);

// GET request for creating a member
//router.get('/create',member_controller.create_member_get);

// POST request for creating a member
router.post('/create',member_controller.create_member_post);

// // GET request for deleting a member
// router.get('/member/delete',member_controller.delete_member_get);

// // POST request for deleting a member
// router.post('/member/delete',member_controller.delete_member_post);

// // GET request for updating a member
// router.get('/member/update',member_controller.update_member_get);

// // POST request for updating a member
// router.post('/member/update',member_controller.update_member_post);


// // LOGIN ROUTE //

// // GET request for member login form
// router.get('/member/login', member_controller.login_get);

// // POST request for member login
// router.post('/member/login', member_controller.login_post);


























module.exports = router;