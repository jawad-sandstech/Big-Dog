const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const roleValidations = require('../../validations/users/role');
const roleControllers = require('../../controllers/users/role.controllers');

const router = express.Router();

router.patch(
  '/',
  authRequired(false),
  validateRequest(roleValidations.updateRole),
  roleControllers.updateRole,
);

module.exports = router;
