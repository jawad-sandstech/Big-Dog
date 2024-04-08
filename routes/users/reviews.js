const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const reviewsValidations = require('../../validations/users/reviews');
const reviewsControllers = require('../../controllers/users/reviews.controllers');

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  authRequired,
  validateRequest(reviewsValidations.getReviews),
  reviewsControllers.getReviews,
);
router.post(
  '/',
  authRequired,
  validateRequest(reviewsValidations.createReview),
  reviewsControllers.createReview,
);

module.exports = router;
