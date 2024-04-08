const Joi = require('joi');

const getCurrentPackage = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const buyPackage = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    packageId: Joi.number().required(),
  }),
});

module.exports = {
  getCurrentPackage,
  buyPackage,
};
