const Joi = require('joi');

const getAllFeedbacks = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const createFeedbacks = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllFeedbacks,
  createFeedbacks,
};
