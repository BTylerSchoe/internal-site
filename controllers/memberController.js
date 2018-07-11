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


// Find a single member with a memberId
const get = async function(req, res){

    let err, member;
  
    [err, member] = await to(Member.findOne({_id: req.params.memberId}));
  
    if (err) return ReE(res, err.message, 422);
    if (member) {
        return ReS(
            res,
            {
              message: "Successfully retrieved member.",
              member: member.toWeb()
            },
            201
          );
        }
      };
    
    module.exports.get = get;


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
    res.setHeader("Content-Type", "application/json");
    const Id = req.params.memberId;
    const body = req.body;
    let err, member;
    

    [err, member] = await to(authService.updateMember(body, Id));


    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully updated member.",
        member: member.toWeb()
      },
      201
    );
  };
module.exports.update = update;

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




