const express = require("express");
const router = express.Router();
const authController = require("./auth-controller");
const {
  validationRules,
  validate,
} = require("../../validations/user-validator");
const ensureAuthenticated = require("../../middleware/verifyJWT");

const loginLimiter = require("../../middleware/loginLimiter");

router
  .route("/register")
  .post(loginLimiter, validationRules(), validate, authController.register);

router
  .route("/login")
  .post(loginLimiter, ensureAuthenticated, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

module.exports = router;
