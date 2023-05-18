const express = require("express");
const router = express.Router();
const profileController = require("./profile-controller");
const ensuredAuthenticated = require("../../middleware/verifyJWT");
const {
  validationRules,
  validate,
} = require("../../validations/user-validator");

router
  .route("/profile/:id")
  .put(
    ensuredAuthenticated,
    validationRules(),
    validate,
    profileController.updateOne
  );

router.route("/profile").get(ensuredAuthenticated, profileController.getOne);

module.exports = router;
