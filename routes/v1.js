const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const CompanyController = require('./../controllers/CompanyController');
const HomeController 	= require('./../controllers/HomeController');
//const = require('./../controllers/TechnologyController'); 
//const = require('./../controllers/BootCampController');
//const = require('./../controllers/NotificationController');
const ProjectController= require('./../controllers/ProjectController');
//const = require('./../controllers/MemberController');


const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


// link routes for other models and controllers
const users = require('./users');
const members = require('./members');
//const technologies = require('./technologies');
//const bootcamps = require('./bootcamps');
//const notifications = require('./notifications');
const projects = require('./projects');
//

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"API v1", data:{"version_number":"v1.0.0"}})
});


// hook in the modular routes
//router.use('/technologies', technologies);
//router.use('/bootcamps', bootcamps);
//router.use('/notifications', notifications);
router.use('/projects', projects);
router.use('/members', members);
router.use('/users', users);
//router.use('/accounts', accounts);


// router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
// router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

// router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
// router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
// router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
