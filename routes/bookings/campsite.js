const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const campsiteValidations = require('../../validations/bookings/campsite');
const campsiteControllers = require('../../controllers/bookings/campsite.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired(),
  validateRequest(campsiteValidations.getAllBookings),
  campsiteControllers.getAllBookings,
);
router.post(
  '/',
  authRequired(),
  validateRequest(campsiteValidations.createBooking),
  campsiteControllers.createBooking,
);

module.exports = router;
