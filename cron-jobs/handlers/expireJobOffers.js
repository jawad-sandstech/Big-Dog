const moment = require('moment');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const expireJobOffers = async () => {
  const fiveMinutesAgo = moment().subtract(5, 'minutes').toDate();

  try {
    await prisma.jobOffers.updateMany({
      where: {
        status: 'SENT',
        createdAt: {
          lt: fiveMinutesAgo,
        },
      },
      data: {
        status: 'EXPIRED',
      },
    });
  } catch (error) {
    logger.error('Error expiring job offers:', error);
  }
};

module.exports = expireJobOffers;
