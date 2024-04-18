const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const reviewsValidations = require('../../validations/users/reviews');
const reviewsControllers = require('../../controllers/users/reviews.controllers');

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  authRequired(),
  validateRequest(reviewsValidations.getReviews),
  reviewsControllers.getReviews,
);
router.post(
  '/',
  authRequired(),
  rolesRequired(['USER']),
  validateRequest(reviewsValidations.createReview),
  reviewsControllers.createReview,
);

module.exports = router;
