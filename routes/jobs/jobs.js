const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const jobsValidations = require('../../validations/jobs/jobs');
const jobsControllers = require('../../controllers/jobs/jobs.controllers');

const router = express.Router();

router.post(
  '/',
  authRequired,
  validateRequest(jobsValidations.createJob),
  jobsControllers.createJob,
);
router.patch(
  '/:jobId',
  authRequired,
  validateRequest(jobsValidations.updateJob),
  jobsControllers.updateJob,
);
router.patch(
  '/:jobOfferId/accept',
  authRequired,
  validateRequest(jobsValidations.acceptJob),
  jobsControllers.acceptJob,
);
router.patch(
  '/:jobOfferId/reject',
  authRequired,
  validateRequest(jobsValidations.rejectJob),
  jobsControllers.rejectJob,
);
router.patch(
  '/:jobOfferId/confirm',
  authRequired,
  validateRequest(jobsValidations.confirmJob),
  jobsControllers.confirmJob,
);

module.exports = router;
