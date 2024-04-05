const Joi = require('joi');

const geMyProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const updateProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

module.exports = {
  geMyProfile,
  updateProfile,
};
