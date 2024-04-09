const { okResponse, serverErrorResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getAllProducts = async (req, res) => {
  try {
    const productCategories = await prisma.productCategories.findMany();

    const response = okResponse(productCategories);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createProduct = async (req, res) => {
  try {
    const productCategories = await prisma.productCategories.findMany();

    const response = okResponse(productCategories);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productCategories = await prisma.productCategories.findMany();

    const response = okResponse(productCategories);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productCategories = await prisma.productCategories.findMany();

    const response = okResponse(productCategories);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
