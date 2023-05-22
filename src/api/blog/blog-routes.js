const express = require("express");
const router = express.Router();
const blogController = require("./blog-controller");
const {
  validationRules,
  validate,
} = require("../../validations/blog-validator");
const ensuredAuthenticated = require("../../middleware/verifyJWT");

router
  .route("/addBlog")
  .post(
    validationRules(),
    validate,
    ensuredAuthenticated,
    blogController.createBlog
  );

router
  .route("/update/:id")
  .put(ensuredAuthenticated, blogController.updateBlog);

router.route("/getBlogs").get(ensuredAuthenticated, blogController.getAllBlogs);

router.route("/get/:id").get(ensuredAuthenticated, blogController.getBlogById);

router.route("/topBlog").get(ensuredAuthenticated, blogController.getTopBlog);

router
  .route("/remove/:id")
  .delete(ensuredAuthenticated, blogController.deleteBlog);

module.exports = router;
