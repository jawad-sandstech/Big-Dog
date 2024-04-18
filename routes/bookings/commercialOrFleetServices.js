const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const commercialOrFleetServicesValidations = require('../../validations/bookings/commercialOrFleetServices');
const commercialOrFleetServicesControllers = require('../../controllers/bookings/commercialOrFleetServices.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired(),
  validateRequest(commercialOrFleetServicesValidations.getAllBookings),
  commercialOrFleetServicesControllers.getAllBookings,
);
router.post(
  '/',
  authRequired(),
  validateRequest(commercialOrFleetServicesValidations.createBooking),
  commercialOrFleetServicesControllers.createBooking,
);

module.exports = router;
