const Joi = require('joi');

const updateRole = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    roleId: Joi.string().email().required(),
  }),
});

module.exports = {
  updateRole,
};
