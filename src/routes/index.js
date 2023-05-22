const express = require("express");
const router = express.Router();
const AuthRoute = require("../api/auth/auth-routes");
const BlogRoute = require("../api/blog/blog-routes");
const CategoryRoute = require("../api/category/categories-routes");
const CommentRoute = require("../api/comment/comment-routes");
const ProfileRoute = require("../api/profile/profile-routes");

router.use("/auth", AuthRoute);

router.use("/blogs", BlogRoute);

router.use("/categories", CategoryRoute);

router.use("/comments", CommentRoute);

router.use("/users", ProfileRoute);

module.exports = router;
