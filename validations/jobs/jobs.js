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

const updateJob = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    radius: Joi.string().required(),
  }),
});

const acceptJob = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    jobOfferId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const rejectJob = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    jobOfferId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  createJob,
  updateJob,
  acceptJob,
  rejectJob,
};
