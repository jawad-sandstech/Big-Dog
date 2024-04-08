const Joi = require('joi');

const createJob = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    milesRequired: Joi.string().required(),
    radius: Joi.string().required(),
    chargingType: Joi.string().required(),
  }),
});

module.exports = {
  createJob,
};
