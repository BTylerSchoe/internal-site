const express = require("express");
const router = express.Router();

const ResourceController = require("./../controllers/ResourceController");

const passport = require("passport");
const path = require("path");

// all resources routes start with /resources
router.post(    "/",                       ResourceController.create);  //REMOVE CREATE,READ,ETC.                                                  // C
//router.get(   "/",                         passport.authenticate('jwt', {session:false}), ResourceController.get);        // R
router.get(     "/all",                    passport.authenticate('jwt', {session:false}), ResourceController.getAll); // R
router.get(     "/:resourceId",            passport.authenticate('jwt', {session:false}), ResourceController.get);
router.put(     "/:resourceId",            passport.authenticate("jwt", { session: false }), ResourceController.update); // U
router.delete(  "/",                       passport.authenticate("jwt", { session: false }), ResourceController.remove); // D

module.exports = router;
