const Joi = require('joi');

const loginWithEmail = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
});

const loginWithNumber = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    phoneNumber: Joi.string().required(),
  }),
});

const verifyOtp = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    otp: Joi.string().required(),
  }).xor('email', 'phoneNumber'),
});

const resendOtp = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
  }).xor('email', 'phoneNumber'),
});

module.exports = {
  loginWithEmail,
  loginWithNumber,
  verifyOtp,
  resendOtp,
};
