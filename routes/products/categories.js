const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const categoriesValidations = require('../../validations/products/categories');
const categoriesControllers = require('../../controllers/products/categories.controllers');

const router = express.Router();

router.get(
  '/',
  validateRequest(categoriesValidations.getAllProductCategories),
  categoriesControllers.getAllProductCategories,
);

module.exports = router;
