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
    images: Joi.array()
      .items(
        Joi.object({
          path: Joi.string().required(),
          isPrimary: Joi.boolean().required(),
        }),
      )
      .single(),
  }),
});

const uploadPicture = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({}),
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
    images: Joi.array()
      .items(
        Joi.object({
          path: Joi.string().required(),
          isPrimary: Joi.boolean().required(),
        }),
      )
      .optional()
      .single(),
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
  uploadPicture,
  updateProduct,
  deleteProduct,
};
