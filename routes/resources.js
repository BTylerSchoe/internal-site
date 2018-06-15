const express = require("express");
const router = express.Router();

const ResourceController = require("./../controllers/ResourceController");

const passport = require("passport");
const path = require("path");

// all users routes start with /users
router.post("/", ResourceController.create); // C
router.get(
  "/",
  ResourceController.get
); // R
router.get(
    "/all",
    ResourceController.getAll
  ); // R
// router.put(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   ResourceController.update
// ); // U
// router.delete(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   ResourceController.remove
// ); // D

module.exports = router;
