const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const offersValidations = require('../../validations/jobs/offers');
const offersControllers = require('../../controllers/jobs/offers.controllers');

const router = express.Router();

router.patch(
  '/:jobOfferId/accept',
  authRequired,
  rolesRequired(['DRIVER']),
  validateRequest(offersValidations.acceptJob),
  offersControllers.acceptJob,
);
router.patch(
  '/:jobOfferId/reject',
  authRequired,
  rolesRequired(['DRIVER']),
  validateRequest(offersValidations.rejectJob),
  offersControllers.rejectJob,
);
router.patch(
  '/:jobOfferId/confirm',
  authRequired,
  rolesRequired(['USER']),
  validateRequest(offersValidations.confirmJob),
  offersControllers.confirmJob,
);

module.exports = router;
