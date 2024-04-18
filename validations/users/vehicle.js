const Joi = require('joi');

const getVehicleInfo = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const addVehicleInfo = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    car: Joi.string().required(),
    model: Joi.string().required(),
    about: Joi.string().required(),
    numberOfOccupants: Joi.number().required(),
    parkingLotInfo: Joi.string().required(),
    roadsideLocationSafe: Joi.boolean().required(),
    numberOfMiles: Joi.number().required(),
  }),
});

const updateVehicleInfo = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    car: Joi.string().optional(),
    model: Joi.string().optional(),
    about: Joi.string().optional(),
    numberOfOccupants: Joi.number().optional(),
    parkingLotInfo: Joi.string().optional(),
    roadsideLocationSafe: Joi.boolean().optional(),
    numberOfMiles: Joi.number().optional(),
  }),
});

module.exports = {
  getVehicleInfo,
  addVehicleInfo,
  updateVehicleInfo,
};
