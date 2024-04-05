const { okResponse, serverErrorResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getAllPackages = async (req, res) => {
  try {
    const packages = await prisma.packages.findMany();

    const response = okResponse(packages);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllPackages,
};
