const express = require("express");
const router = express.Router();
const categoryController = require("./categories-controller.js");
const {
  validationRules,
  validate,
} = require("../../validations/category-validator");
const ensuredAuthenticated = require("../../middleware/verifyJWT");

router
  .route("/create")
  .post(
    validationRules(),
    validate,
    ensuredAuthenticated,
    categoryController.addOne
  );

router
  .route("/update/:id")
  .put(ensuredAuthenticated, categoryController.updateOne);

router
  .route("/delete/:id")
  .delete(ensuredAuthenticated, categoryController.removeOne);

router.route("/get").get(ensuredAuthenticated, categoryController.getAll);

router.route("/get/:id").get(ensuredAuthenticated, categoryController.getOne);

module.exports = router;
