const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const offersValidations = require('../../validations/jobs/offers');
const offersControllers = require('../../controllers/jobs/offers.controllers');

const router = express.Router();

router.patch(
  '/:jobOfferId/accept',
  authRequired,
  validateRequest(offersValidations.acceptJob),
  offersControllers.acceptJob,
);
router.patch(
  '/:jobOfferId/reject',
  authRequired,
  validateRequest(offersValidations.rejectJob),
  offersControllers.rejectJob,
);
router.patch(
  '/:jobOfferId/confirm',
  authRequired,
  validateRequest(offersValidations.confirmJob),
  offersControllers.confirmJob,
);

module.exports = router;
