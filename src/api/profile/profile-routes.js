const express = require("express");
const router = express.Router();
const profileController = require("./profile-controller");
const ensuredAuthenticated = require("../../middleware/verifyJWT");
const {
  validationRules,
  validate,
} = require("../../validations/user-validator");

router
  .route("/getProfile/:id")
  .get(ensuredAuthenticated, profileController.getUserById);

router.route("/updateProfile/:id").put(
  ensuredAuthenticated,
  // validationRules(),
  // validate,
  profileController.updateUser
);

router
  .route("/deleteProfile/:id")
  .delete(ensuredAuthenticated, profileController.deleteUser);

module.exports = router;
