const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const expireOldOTPs = async () => {
  try {
    await prisma.userOTP.updateMany({
      where: {
        isExpired: false,
        expirationDateTime: {
          lt: new Date(),
        },
      },
      data: {
        isExpired: true,
      },
    });
  } catch (error) {
    logger.error('Error expiring user OTPs:', error);
  }
};

module.exports = expireOldOTPs;
