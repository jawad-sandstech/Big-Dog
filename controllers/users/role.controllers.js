const {
  okResponse,
  serverErrorResponse,
  badRequestResponse,
  notFoundResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
// const twilio = require('../../config/twilio.config');
const logger = require('../../config/logger.config');

const updateRole = async (req, res) => {
  const { role } = req.body;
  const { userId } = req.user;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    if (user.role) {
      const response = badRequestResponse('Cannot change role once selected.');
      return res.status(response.status.code).json(response);
    }

    await prisma.users.update({
      where: { id: userId },
      data: { role },
    });

    const response = okResponse(null, 'Role updated successfully.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  updateRole,
};
