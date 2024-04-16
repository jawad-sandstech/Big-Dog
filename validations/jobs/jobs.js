const Joi = require('joi');

const getSingleJobRequest = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    jobId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

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
    milesRequired: Joi.number().required(),
    radius: Joi.number().required(),
    chargingType: Joi.string().required(),
  }),
});

const updateJob = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    jobId: Joi.number().required(),
  }),
  body: Joi.object({
    radius: Joi.number().required(),
  }),
});

module.exports = {
  getSingleJobRequest,
  getConversationIdOfJobRequest,
  createJob,
  updateJob,
};
