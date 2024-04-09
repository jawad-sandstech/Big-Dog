const Joi = require('joi');

const getAllMessages = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    chatId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createMessage = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    chatId: Joi.number().required(),
  }),
  body: Joi.object({
    content: Joi.string().required(),
  }),
});

module.exports = {
  getAllMessages,
  createMessage,
};
