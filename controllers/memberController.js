const Member = require('../models').Member;
const authService   = require('./../services/AuthService');
const validator = require('validator');

var async = require('async');

//Do not change until speakin to Amit()
const create = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    const body = req.body;
    let err, member;
  
    [err, member] = await to(authService.createMember(body));
  
    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully added new member.",
        member: member.toWeb(), token:member.getJWT()}, 201);
      }
  module.exports.create = create;


// const get = async function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     console.log("hello")
//     let member = req.member;
//     // let companies = await member.Companies()

//     return ReS(res, {member:member.toWeb(), companies: await member.Companies(), jwt: member.getJWT()});
// }
// module.exports.get = get;


// Find a single member with a memberId
const get = async function(req, res){
    Member.findById(req.params.memberId)
    .then(member => {
        if(!member) {
            return ReS(res, {
                message: "member not found with id " + req.params.memberId
            });            
        }
        res.send(member);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return ReS(res, {
                message: "member not found with id " + req.params.memberId
            });                
        }
        return ReS(res, {
            message: "Error retrieving member with id " + req.params.memberId
        });
    });
};
module.exports.get = get;

// const getAll = async function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     let member = req.member;
//     let err, members;
//     [err, members] = await to(Member.find());

//     return ReS(res, {
//         message: "Successfully retrieved members.",
//         members
//       });
//     };
//     module.exports.getAll = getAll;

    const getAll = async function(req, res){
        res.setHeader('Content-Type', 'application/json');
        let member = req.member;
        let err, members;
        [err, members] = await to(Member.find());
    
        return ReS(res, {
            message: "Successfully retrieved members.",
            members
          });
        };
        module.exports.getAll = getAll;

// Update a member identified by the memberId in the request
const update = async function(req, res){
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "member body can not be empty"
        });
    }

    // Find member and update it with the request body
    Member.findByIdAndUpdate(req.params.memberId, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        account_type: req.body.account_type
    }, {new: true})
    .then(member => {
        if(!member) {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });
        }
        return ReS(res,{member:member.toWeb()});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });                
        }
        return res.status(500).send({
            message: "Error updating member with id " + req.params.memberId
        });
    });
};
module.exports.update = update;

// const update = async function(req, res){
//     let err, member, data
//     member = req.member;
//     data = req.body;
//     member.set(data);

//     [err, member] = await to(member.save());
//     if(err){
//         console.log(err, member);

//         if(err.message.includes('E11000')){
//             if(err.message.includes('phone')){
//                 err = 'This phone number is already in use';
//             } else if(err.message.includes('email')){
//                 err = 'This email address is already in use';
//             }else{
//                 err = 'Duplicate Key Entry';
//             }
//         }

//         return ReE(res, err);
//     }
//     return ReS(res, {message :'Updated Member: '+member.email});
// }
// module.exports.update = update;

// remove member //
const remove = async function(req, res){
    let body, err, member;
    body = req.body;

    //console.log(authService.deleteMember(body));
    [err, member] = await to(authService.deleteMember(body));
    if(err) return ReE(res, 'error occured trying to delete the member');
  
    return ReS(res, {message:'Deleted member-'}, 204);
  }
  module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, member;

    [err, member] = await to(authService.authMember(req.body));// ask amit about change / relates to same syntax above
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

