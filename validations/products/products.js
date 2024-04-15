const Joi = require('joi');

const getAllProducts = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
});

const createProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    categoryId: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  }),
});

const updateProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    productId: Joi.number().optional(),
  }),
  body: Joi.object({
    categoryId: Joi.number().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
  }),
});

const deleteProduct = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    productId: Joi.number().optional(),
  }),
  body: Joi.object({}),
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
