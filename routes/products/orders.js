const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const ordersValidations = require('../../validations/products/orders');
const ordersControllers = require('../../controllers/products/orders.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired(),
  rolesRequired(['ADMIN']),
  validateRequest(ordersValidations.getAllOrders),
  ordersControllers.getAllOrders,
);
router.get(
  '/:orderId',
  authRequired(),
  rolesRequired(['ADMIN', 'USER']),
  validateRequest(ordersValidations.getSingleOrder),
  ordersControllers.getSingleOrder,
);
router.post(
  '/',
  authRequired(),
  rolesRequired(['USER']),
  validateRequest(ordersValidations.createOrder),
  ordersControllers.createOrder,
);

module.exports = router;
