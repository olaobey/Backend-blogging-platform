const express = require("express");
const router = express.Router();
const categoryController = required("./categories-controller.js");

router.route("/categories").get(categoryController.getAll);

router.route("/categories/:id").get(categoryController.getOne);

module.exports = router;
