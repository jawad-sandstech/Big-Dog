const Joi = require('joi');

const updateRole = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    role: Joi.string().valid('USER', 'DRIVER').required(),
  }),
});

module.exports = {
  updateRole,
};
