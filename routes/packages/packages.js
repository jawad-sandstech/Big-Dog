const express = require('express');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const packagesValidations = require('../../validations/packages/packages');
const packagesControllers = require('../../controllers/packages/packages.controllers');

const router = express.Router();

router.get(
  '/',
  validateRequest(packagesValidations.getAllPackages),
  packagesControllers.getAllPackages,
);

module.exports = router;
