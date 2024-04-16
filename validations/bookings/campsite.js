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
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    time: Joi.string().required(),
    NoOfFloors: Joi.string().required(),
    SqFt: Joi.string().required(),
    noOfStories: Joi.string().required(),
    elevator: Joi.string().required(),
    requireHardHad: Joi.string().required(),
    describeSituation: Joi.string().required(),
    noOfItemsNeededToPower: Joi.string().required(),
    noOfLights: Joi.string().required(),
    TTLWatts: Joi.string().required(),
    noOfHoursPowerIsNeeded: Joi.string().required(),
    listItemsNeededToPower: Joi.string().required(),
  }),
});

module.exports = {
  getAllBookings,
  createBooking,
};
