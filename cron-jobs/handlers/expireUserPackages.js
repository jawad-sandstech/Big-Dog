const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const expireUserPackages = async () => {
  logger.info('expireUserPackages cron job running...');

  try {
    const expiredUserPackages = await prisma.userPackages.findMany({
      where: {
        isActive: true,
        expireAt: {
          lt: new Date(),
        },
      },
    });

    if (expiredUserPackages.length > 0) {
      await Promise.all(
        expiredUserPackages.map(async (i) => {
          await prisma.userPackages.update({
            where: { id: i.id },
            data: { isActive: false },
          });

          await prisma.userRescueCharges.update({
            where: { userId: i.userId },
            data: { chargesUsed: 0, chargesRemaining: 0 },
          });
        }),
      );
    }
  } catch (error) {
    logger.error('Error expiring user packages:', error);
  }
};

module.exports = expireUserPackages;
