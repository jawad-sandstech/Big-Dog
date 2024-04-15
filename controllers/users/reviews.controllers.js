const { okResponse, serverErrorResponse, createSuccessResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getReviews = async (req, res) => {
  const driverId = Number(req.params.userId);

  try {
    const reviews = await prisma.driverReviews.findMany({
      where: { driverId },
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
  const driverId = Number(req.params.userId);
  const { userId } = req.user;
  const data = req.body;

  try {
    const review = await prisma.driverReviews.create({
      data: {
        driverId,
        userId,
        ...data,
      },
    });

    const response = createSuccessResponse(review);
    return res.status(response.status.code).json(response);
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
