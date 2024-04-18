const Joi = require('joi');

const getMyProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const uploadPicture = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const updateProfile = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional(),
    bio: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().optional(),
    address: Joi.object({
      country: Joi.string().optional(),
      state: Joi.string().optional(),
      city: Joi.string().optional(),
      streetAddress: Joi.string().optional(),
    }).optional(),
  }),
});

const updateLocation = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
});

module.exports = {
  getMyProfile,
  updateProfile,
  updateLocation,
  uploadPicture,
};
