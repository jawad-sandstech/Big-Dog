const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const jobsValidations = require('../../validations/jobs/jobs');
const jobsControllers = require('../../controllers/jobs/jobs.controllers');

const router = express.Router();

router.get(
  '/:jobId',
  authRequired(),
  validateRequest(jobsValidations.getSingleJobRequest),
  jobsControllers.getSingleJobRequest,
);
router.get(
  '/:jobId/conversation-id',
  authRequired(),
  validateRequest(jobsValidations.getConversationIdOfJobRequest),
  jobsControllers.getConversationIdOfJobRequest,
);
router.post(
  '/',
  authRequired(),
  rolesRequired(['USER']),
  validateRequest(jobsValidations.createJob),
  jobsControllers.createJob,
);
router.patch(
  '/:jobId',
  authRequired(),
  rolesRequired(['USER']),
  validateRequest(jobsValidations.updateJob),
  jobsControllers.updateJob,
);

module.exports = router;
