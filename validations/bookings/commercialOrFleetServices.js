const Joi = require('joi');

const getAllBookings = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const createBooking = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    companyName: Joi.string().required(),
    numberOfCars: Joi.string().required(),
    intervals: Joi.string().required(),
    averageChargeLevel: Joi.string().required(),
    typeOfVehicle: Joi.string().required(),
    address: Joi.string().required(),
  }),
});

module.exports = {
  getAllBookings,
  createBooking,
};
