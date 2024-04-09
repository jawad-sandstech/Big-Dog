const { serverErrorResponse, okResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        FeedbackImages: true,
        User: true,
      },
    });

    const response = okResponse(feedbacks);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createFeedbacks = async (req, res) => {};

module.exports = {
  getAllFeedbacks,
  createFeedbacks,
};
