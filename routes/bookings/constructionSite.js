const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const constructionSiteValidations = require('../../validations/bookings/constructionSite');
const constructionSiteControllers = require('../../controllers/bookings/constructionSite.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired(),
  validateRequest(constructionSiteValidations.getAllBookings),
  constructionSiteControllers.getAllBookings,
);
router.post(
  '/',
  authRequired(),
  validateRequest(constructionSiteValidations.createBooking),
  constructionSiteControllers.createBooking,
);

module.exports = router;
