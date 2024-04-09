const Joi = require('joi');

const addVehicleInfo = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    car: Joi.string().required(),
    model: Joi.string().required(),
    about: Joi.string().required(),
  }),
});

const updateVehicleInfo = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    vehicleId: Joi.number().required(),
  }),
  body: Joi.object({
    car: Joi.string().optional(),
    model: Joi.string().optional(),
    about: Joi.string().optional(),
  }),
});

module.exports = {
  addVehicleInfo,
  updateVehicleInfo,
};
