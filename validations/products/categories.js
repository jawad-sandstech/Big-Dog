const Joi = require('joi');

const getAllProductCategories = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  getAllProductCategories,
};
