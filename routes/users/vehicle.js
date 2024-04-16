const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const rolesRequired = require('../../middlewares/rolesRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const vehicleValidations = require('../../validations/users/vehicle');
const vehicleControllers = require('../../controllers/users/vehicle.controllers');

const router = express.Router();

router.post(
  '/',
  authRequired,
  rolesRequired(['USER']),
  validateRequest(vehicleValidations.addVehicleInfo),
  vehicleControllers.addVehicleInfo,
);
router.patch(
  '/:vehicleId',
  authRequired,
  rolesRequired(['USER']),
  validateRequest(vehicleValidations.updateVehicleInfo),
  vehicleControllers.updateVehicleInfo,
);

module.exports = router;
