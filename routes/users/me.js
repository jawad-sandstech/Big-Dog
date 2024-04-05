const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const meValidations = require('../../validations/users/me');
const meControllers = require('../../controllers/users/me.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(meValidations.getMyProfile),
  meControllers.getMyProfile,
);
router.patch(
  '/',
  authRequired,
  validateRequest(meValidations.updateProfile),
  meControllers.updateProfile,
);

module.exports = router;
