const Member = require('../models').Member;
const authService   = require('./../services/AuthService');

//var Member = require('../models/member');
//var Project = require('../models/project');
//var Bootcamp = require('../models/bootcamp');
//var Technology = require('../models/technology');
//var Notification = require('../models/notification');

const validator = require('validator');

var async = require('async');



//Do not change until speakin to Amit()
const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, member;

        [err, member] = await to(authService.createUser(body));// change to suit member??? or delete meber and work from user? ask amit!!

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new member.', member:member.toWeb(), token:member.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log("hello")
    let member = req.member;
    // let companies = await member.Companies()

    return ReS(res, {member:member.toWeb(), companies: await member.Companies(), jwt: member.getJWT()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, member, data
    member = req.member;
    data = req.body;
    member.set(data);

    [err, member] = await to(member.save());
    if(err){
        console.log(err, member);

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
    return ReS(res, {message :'Updated Member: '+member.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let member, err;
    member = req.member;

    [err, member] = await to(member.destroy());
    if(err) return ReE(res, 'error occured trying to delete member');

    return ReS(res, {message:'Deleted Member'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, member;

    [err, member] = await to(authService.authUser(req.body));// ask amit about change / relates to same syntax above
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:member.getJWT(), member:member.toWeb()});
}
module.exports.login = login;


// Display Member create form on GET.
exports.create_member_post = async function(req, res, next) {     
    res.setHeader('Content-Type', 'application/json'); 
    
    const body = req.body;
    let err, member, account;

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

