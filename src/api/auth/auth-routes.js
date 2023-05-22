const express = require("express");
const router = express.Router();
const authController = require("./auth-controller");
const {
  validationRules,
  validate,
} = require("../../validations/user-validator");

const loginLimiter = require("../../middleware/loginLimiter");

router
  .route("/register")
  .post(validationRules(), validate, authController.register);

router.route("/login").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").get(authController.logout);

module.exports = router;
