const Joi = require('joi');

const getConversationIdOfJobRequest = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    jobId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

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

module.exports = {
  getConversationIdOfJobRequest,
  createJob,
  updateJob,
};
