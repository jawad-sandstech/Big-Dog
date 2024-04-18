const express = require('express');
const multer = require('multer');

const storage = require('../../config/multer.config');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const feedbacksValidations = require('../../validations/feedbacks/feedbacks');
const feedbacksControllers = require('../../controllers/feedbacks/feedbacks.controllers');

const router = express.Router();

const upload = multer({ storage });

router.get(
  '/',
  authRequired(),
  rolesRequired(['ADMIN']),
  validateRequest(feedbacksValidations.getAllFeedbacks),
  feedbacksControllers.getAllFeedbacks,
);
router.post(
  '/',
  authRequired(),
  rolesRequired(['USER', 'DRIVER']),
  upload.array('images'),
  validateRequest(feedbacksValidations.createFeedbacks),
  feedbacksControllers.createFeedbacks,
);

module.exports = router;
