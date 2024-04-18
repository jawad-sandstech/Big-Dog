const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const userPackageValidations = require('../../validations/user-packages/userPackages');
const userPackageControllers = require('../../controllers/user-packages/userPackages.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired(),
  rolesRequired(['USER']),
  validateRequest(userPackageValidations.getCurrentPackage),
  userPackageControllers.getCurrentPackage,
);
router.post(
  '/',
  authRequired(),
  rolesRequired(['USER']),
  validateRequest(userPackageValidations.buyPackage),
  userPackageControllers.buyPackage,
);

module.exports = router;
