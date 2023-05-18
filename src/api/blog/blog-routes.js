const express = require("express");
const router = express.Router();
const blogController = require("./blog-controller");
const {
  validationRules,
  validate,
} = require("../../validations/blog-validator");
const ensuredAuthenticated = require("../../middleware/verifyJWT");

router
  .route("/blog")
  .post(
    validationRules(),
    validate,
    ensuredAuthenticated,
    blogController.createBlog
  );

router
  .route("/blog/update/:id")
  .put(ensuredAuthenticated, blogController.updateBlog);

router.route("/blogs").get(ensuredAuthenticated, blogController.getAllBlogs);

router
  .route("/blog/get/:id")
  .get(ensuredAuthenticated, blogController.getBlogById);

router.route("/blog/top").get(ensuredAuthenticated, blogController.getTopBlog);

router
  .route("/blog/:id")
  .delete(ensuredAuthenticated, blogController.deleteBlog);

module.exports = router;
