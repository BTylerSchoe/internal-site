const Member = require('../models').Member;
const authService   = require('./../services/AuthService');



//var Member = require('../models/member');
//var Project = require('../models/project');
//var Bootcamp = require('../models/bootcamp');
//var Technology = require('../models/technology');
//var Notification = require('../models/notification');

const validator = require('validator');

//const { body,validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');

var async = require('async');


// // temporary index page, will be replaced will banner and quote?
// // displays total number of database entries currently
// exports.index = function(req, res) {
    
//     async.parallel({
//         project_count: function(callback) {
//             Project.count({}, callback);
//         },

//         member_count: function(callback) {
//             Member.count({}, callback);
//         },

//         bootcamp_count: function(callback) {
//             Bootcamp.count({}, callback);
//         },

//         technology_count: function(callback) {
//             Technology.count({}, callback);
//         },

//         notification_count: function(callback) {
//             Notification.count({}, callback);
//         },
        
//     });
// };

// Display list of all Members.
exports.member_list_get = function(req, res, next) {

    Member.find()
      .sort([['first_name', 'ascending']])
      .exec(function (err, list_members) {
        if (err) { return next(err); }
        //Successful, so render

        return ReS(res, { title: 'Member List', member_list_get: list_members })
        // res.render('member_list', { title: 'Member List', member_list_get: list_members });
      });
  
  };


// Display detail page for a specific Member.
exports.member_details_get = async function(req, res, next) {
    const body = req.body;
    let user, err;

    Member.find(user)
        if(accountInfo === null) {
            return ReE(res, 'No user was found by that name.');
        }

        return ReS(res, {member: member.toWeb()})
    

};


// // Display Member create form on GET.
// exports.create_member_get = function(req, res, next) {       
//     //res.render('create_member_form', { title: 'Create Member'});
// };








const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log("hello")
    let user = req.user;
    // let companies = await user.Companies()

    return ReS(res, {user:user.toWeb(), companies: await user.Companies(), jwt: user.getJWT()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        console.log(err, user);

        if(err.message.includes('E11000')){
            if(err.message.includes('phone')){
                err = 'This phone number is already in use';
            } else if(err.message.includes('email')){
                err = 'This email address is already in use';
            }else{
                err = 'Duplicate Key Entry';
            }
        }

        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;


// Display Member create form on GET.
exports.create_member_post = async function(req, res, next) {     
    res.setHeader('Content-Type', 'application/json'); 
    
    const body = req.body;
    let err, user, account;

    if(!body.first_name) return ReE(res, "A first name was not entered.");
    if(!body.last_name) return ReE(res, "A last name was not entered.");
    if(!body.email) return ReE(res, "An email was not entered.");
    if(!body.password) return ReE(res, "A password was not entered.");

    if(!validator.isLength(body.first_name, {min: 3, max: 50})) return ReE(res, "A valid first name was not entered.");
    if(!validator.isLength(body.last_name, {min: 3, max: 50})) return ReE(res, "A valid last name was not entered.");
    if(!validator.isEmail(body.email)) return ReE(res, "A valid email was not entered.");
    if(!validator.isLength(body.password, {min: 8, max: 50})) return ReE(res, "A valid password was not entered.");

    // input sanitization - only enter what's required.
    const { first_name, last_name, email, password } = body;
    const accountInfo = {
        first_name,
        last_name,
        email,
        password,
        account_type: 'i'
    };

    [err, member] = await to(Member.create(accountInfo));
    // console.log(err)
    // console.log(member)
    if(err) return ReE(res, err.message);

    return ReS(res, { token: member.getJWT(), member: member.toWeb() });
};

