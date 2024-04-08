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

module.exports = router;
