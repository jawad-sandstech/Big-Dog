const Joi = require('joi');

const getAllOrders = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const getSingleOrder = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    orderId: Joi.number().required(),
  }),
  body: Joi.object({}),
});

const createOrder = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    orderItems: Joi.array()
      .items({
        productId: Joi.number().required(),
        quantity: Joi.number().required(),
      })
      .single(),
  }),
});

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
};
