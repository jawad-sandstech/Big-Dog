const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const vehicleValidations = require('../../validations/users/vehicle');
const vehicleControllers = require('../../controllers/users/vehicle.controllers');

const router = express.Router();

router.post(
  '/',
  authRequired,
  validateRequest(vehicleValidations.addVehicleInfo),
  vehicleControllers.addVehicleInfo,
);
router.patch(
  '/:vehicleId',
  authRequired,
  validateRequest(vehicleValidations.updateVehicleInfo),
  vehicleControllers.updateVehicleInfo,
);

module.exports = router;
