const express = require('express');
const multer = require('multer');

const storage = require('../../config/multer.config');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const productsValidations = require('../../validations/products/products');
const productsControllers = require('../../controllers/products/products.controllers');

const router = express.Router();

const upload = multer({ storage });

router.get(
  '/',
  validateRequest(productsValidations.getAllProducts),
  productsControllers.getAllProducts,
);
router.post(
  '/',
  authRequired,
  upload.array('images'),
  validateRequest(productsValidations.createProduct),
  productsControllers.createProduct,
);
router.patch(
  '/:productId',
  authRequired,
  upload.array('images'),
  validateRequest(productsValidations.updateProduct),
  productsControllers.updateProduct,
);
router.delete(
  '/:productId',
  authRequired,
  validateRequest(productsValidations.deleteProduct),
  productsControllers.deleteProduct,
);

module.exports = router;
