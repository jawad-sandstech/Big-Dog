const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const ordersValidations = require('../../validations/products/orders');
const ordersControllers = require('../../controllers/products/orders.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(ordersValidations.getAllOrders),
  ordersControllers.getAllOrders,
);
router.get(
  '/:orderId',
  authRequired,
  validateRequest(ordersValidations.getSingleOrder),
  ordersControllers.getSingleOrder,
);
router.post(
  '/',
  authRequired,
  validateRequest(ordersValidations.createOrder),
  ordersControllers.createOrder,
);

module.exports = router;
