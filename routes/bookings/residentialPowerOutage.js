const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const residentialPowerOutageValidations = require('../../validations/bookings/residentialPowerOutage');
const residentialPowerOutageControllers = require('../../controllers/bookings/residentialPowerOutage.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired(),
  validateRequest(residentialPowerOutageValidations.getAllBookings),
  residentialPowerOutageControllers.getAllBookings,
);
router.post(
  '/',
  authRequired(),
  validateRequest(residentialPowerOutageValidations.createBooking),
  residentialPowerOutageControllers.createBooking,
);

module.exports = router;
