const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const jobsValidations = require('../../validations/jobs/jobs');
const jobsControllers = require('../../controllers/jobs/jobs.controllers');

const router = express.Router();

router.get(
  '/:jobId/conversation-id',
  authRequired,
  validateRequest(jobsValidations.getConversationIdOfJobRequest),
  jobsControllers.getConversationIdOfJobRequest,
);
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

module.exports = router;
