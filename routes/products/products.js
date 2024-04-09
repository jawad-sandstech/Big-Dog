const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const productsValidations = require('../../validations/products/products');
const productsControllers = require('../../controllers/products/products.controllers');

const router = express.Router();

router.get(
  '/',
  validateRequest(productsValidations.getAllProducts),
  productsControllers.getAllProducts,
);
router.post(
  '/',
  authRequired,
  validateRequest(productsValidations.createProduct),
  productsControllers.createProduct,
);
router.patch(
  '/',
  authRequired,
  validateRequest(productsValidations.updateProduct),
  productsControllers.updateProduct,
);
router.delete(
  '/',
  authRequired,
  validateRequest(productsValidations.deleteProduct),
  productsControllers.deleteProduct,
);

module.exports = router;
