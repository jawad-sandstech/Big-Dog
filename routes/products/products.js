const express = require('express');
const multer = require('multer');

const storage = require('../../config/multer.config');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
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
  '/upload-picture',
  authRequired(),
  rolesRequired(['ADMIN']),
  upload.single('image'),
  validateRequest(productsValidations.uploadPicture),
  productsControllers.uploadPicture,
);
router.post(
  '/',
  authRequired(),
  rolesRequired(['ADMIN']),
  validateRequest(productsValidations.createProduct),
  productsControllers.createProduct,
);
router.patch(
  '/:productId',
  authRequired(),
  rolesRequired(['ADMIN']),
  validateRequest(productsValidations.updateProduct),
  productsControllers.updateProduct,
);
router.delete(
  '/:productId',
  authRequired(),
  rolesRequired(['ADMIN']),
  validateRequest(productsValidations.deleteProduct),
  productsControllers.deleteProduct,
);

module.exports = router;
