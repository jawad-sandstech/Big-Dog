const express = require('express');
const multer = require('multer');

const storage = require('../../config/multer.config');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const meValidations = require('../../validations/users/me');
const meControllers = require('../../controllers/users/me.controllers');

const router = express.Router();

const upload = multer({ storage });

router.get(
  '/',
  authRequired(),
  validateRequest(meValidations.getMyProfile),
  meControllers.getMyProfile,
);
router.post(
  '/update-profile',
  authRequired(),
  upload.single('profile'),
  validateRequest(meValidations.uploadPicture),
  meControllers.uploadPicture,
);
router.patch(
  '/',
  authRequired(),
  validateRequest(meValidations.updateProfile),
  meControllers.updateProfile,
);
router.patch(
  '/update-location',
  authRequired(),
  rolesRequired(['DRIVER']),
  validateRequest(meValidations.updateLocation),
  meControllers.updateLocation,
);

module.exports = router;
