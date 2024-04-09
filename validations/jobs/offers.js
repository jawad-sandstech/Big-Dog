const Joi = require('joi');

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

const confirmJob = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    jobOfferId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  acceptJob,
  rejectJob,
  confirmJob,
};
