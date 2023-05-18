const express = require("express");
const router = express.Router();
const {
  validationRules,
  validate,
} = require("../../validations/comment-validator");
const commentController = require("./comment-routes");
const ensuredAuthenticated = require("../../middleware/verifyJWT");

router
  .route("/comments")
  .post(
    validationRules(),
    validate,
    ensuredAuthenticated,
    commentController.addOne
  );

router
  .route("/comments/:id")
  .delete(ensuredAuthenticated, commentController.removeOne);

module.exports = router;
