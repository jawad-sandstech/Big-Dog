const { okResponse, serverErrorResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await prisma.driverReviews.findMany({
      where: { driverId: userId },
      include: { Reviewer: true },
    });

    const response = okResponse(reviews);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createReview = async (req, res) => {
  const { userId } = req.params;

  try {
    // ...code
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getReviews,
  createReview,
};
