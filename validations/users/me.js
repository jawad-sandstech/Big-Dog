const Joi = require('joi');

const getMyProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const updateProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
    bio: Joi.string().required(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().optional(),
    address: Joi.object({
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      streetAddress: Joi.string().required(),
    }).required(),
  }),
});

module.exports = {
  getMyProfile,
  updateProfile,
};
