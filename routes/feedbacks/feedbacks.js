const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const feedbacksValidations = require('../../validations/feedbacks/feedbacks');
const feedbacksControllers = require('../../controllers/feedbacks/feedbacks.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(feedbacksValidations.getAllFeedbacks),
  feedbacksControllers.getAllFeedbacks,
);
router.post(
  '/',
  authRequired,
  validateRequest(feedbacksValidations.createFeedbacks),
  feedbacksControllers.createFeedbacks,
);

module.exports = router;
