const {
  okResponse,
  serverErrorResponse,
  notFoundResponse,
  updateSuccessResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getMyProfile = async (req, res) => {
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
  const data = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    if (data.email) {
      const existingEmail = await prisma.users.findFirst({ where: { email: data.email } });

      if (existingEmail) {
        const response = notFoundResponse('This email is already taken.');
        return res.status(response.status.code).json(response);
      }
    }

    if (data.phoneNumber) {
      const existingPhoneNumber = await prisma.users.findFirst({ where: { email: data.email } });

      if (existingPhoneNumber) {
        const response = notFoundResponse('This phone number is already taken.');
        return res.status(response.status.code).json(response);
      }
    }

    await prisma.users.update({
      where: { id: userId },
      data,
    });

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getMyProfile,
  updateProfile,
};
