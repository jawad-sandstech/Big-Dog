const Joi = require('joi');

const getReviews = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    userId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createReview = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    userId: Joi.number().required(),
  }),
  body: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }),
});

module.exports = {
  getReviews,
  createReview,
};
