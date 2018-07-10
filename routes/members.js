var express = require('express');
var router = express.Router();




const MemberController 	= require('./../controllers/MemberController');

const passport      	= require('passport');
const path              = require('path');

// all members routes start with /members
router.post(    '/',              MemberController.create);                                                    // C
//router.get(     '/',            passport.authenticate('jwt', {session:false}), MemberController.get);        // R
router.get(    "/all",            passport.authenticate('jwt', {session:false}), MemberController.getAll);
router.get('/:memberId',          passport.authenticate('jwt', {session:false}), MemberController.get);// R
// router.put(     '/',           passport.authenticate('jwt', {session:false}), MemberController.update);     // U
router.delete(  '/',              passport.authenticate('jwt', {session:false}), MemberController.remove);     // D


module.exports = router


























module.exports = router;