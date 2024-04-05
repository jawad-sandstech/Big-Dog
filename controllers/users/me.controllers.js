const { okResponse, serverErrorResponse, notFoundResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const geMyProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(user);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(user);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  geMyProfile,
  updateProfile,
};
