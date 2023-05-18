const express = require("express");
const router = express.Router();
const AuthRoute = require("../api/auth/auth-routes");
const BlogRoute = require("../api/blog/blog-routes");
const CategoryRoute = require("../api/category/categories-routes");
const CommentRoute = require("../api/comment/comment-routes");
const ProfileRoute = require("../api/profile/profile-routes");

router.use("/", AuthRoute);

router.use("/", BlogRoute);

router.use("/", CategoryRoute);

router.use("/", CommentRoute);

router.use("/", ProfileRoute);

module.exports = router;
