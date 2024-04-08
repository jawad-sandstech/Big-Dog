const moment = require('moment');

const prisma = require('../../config/database.config');

const paymentIntentSucceededHandler = async (paymentIntent) => {
  const { userId: userIdStr, packageId: packageIdStr } = paymentIntent.metadata;

  const userId = Number(userIdStr);
  const packageId = Number(packageIdStr);

  const currentDate = moment();
  const oneYearLater = currentDate.add(1, 'years');

  const packageDeal = await prisma.packages.findUnique({ where: { id: packageId } });

  const existingUserPackage = await prisma.userPackages.findFirst({
    where: {
      userId,
      isActive: true,
      expireAt: {
        gt: new Date(),
      },
    },
  });

  if (existingUserPackage) {
    await prisma.userPackages.update({
      where: { id: existingUserPackage.id },
      data: { isActive: false },
    });
  }

  await prisma.userPackages.create({
    data: {
      userId,
      packageId,
      isActive: true,
      expireAt: oneYearLater,
    },
  });

  const existingUserRescueCharges = await prisma.userRescueCharges.findFirst({
    where: { userId },
  });

  if (existingUserRescueCharges) {
    await prisma.userRescueCharges.update({
      where: { id: existingUserRescueCharges.id },
      data: {
        chargesUsed: 0,
        chargesRemaining: packageDeal.rescueChargesPerYear,
      },
    });
  } else {
    await prisma.userRescueCharges.create({
      data: {
        userId,
        chargesUsed: 0,
        chargesRemaining: packageDeal.rescueChargesPerYear,
      },
    });
  }
};

module.exports = paymentIntentSucceededHandler;
