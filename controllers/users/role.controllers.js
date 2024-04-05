const { okResponse, serverErrorResponse, badRequestResponse } = require('generic-response');

const prisma = require('../../config/database.config');
// const twilio = require('../../config/twilio.config');
const logger = require('../../config/logger.config');

const updateRole = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: { Role: true },
    });

    if (!user.Role?.name) {
      const response = badRequestResponse('Cannot change role once selected.');
      return res.status(response.status.code).json(response);
    }

    const response = okResponse();
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
