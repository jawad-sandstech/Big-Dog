const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const userPackageValidations = require('../../validations/user-packages/userPackages');
const userPackageControllers = require('../../controllers/user-packages/userPackages.controllers');

const router = express.Router();

router.get(
  '/',
  authRequired,
  validateRequest(userPackageValidations.getCurrentPackage),
  userPackageControllers.getCurrentPackage,
);
router.post(
  '/',
  authRequired,
  validateRequest(userPackageValidations.buyPackage),
  userPackageControllers.buyPackage,
);

module.exports = router;
