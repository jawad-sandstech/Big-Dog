const moment = require('moment');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const handlePackagePurchase = async (paymentIntent) => {
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

const handleJobConfirmation = async (paymentIntent) => {
  const { userId: userIdStr, decrementChargesRemaining, jobRequestId } = paymentIntent.metadata;

  const userId = Number(userIdStr);

  const jobRequest = await prisma.jobRequests.update({
    where: { id: jobRequestId },
    data: { hasPaid: true },
    include: { JobOffers: { where: { status: 'ACCEPTED' } } },
  });

  const conversation = await prisma.conversations.create({
    data: {
      user1Id: jobRequest.userId,
      user2Id: jobRequest.JobOffers[0].driverId,
    },
  });

  await prisma.jobRequests.update({
    where: { id: jobRequest.id },
    data: { conversationId: conversation.id },
  });

  if (decrementChargesRemaining) {
    await prisma.userRescueCharges.update({
      where: { userId },
      data: {
        chargesRemaining: {
          decrement: 1,
        },
      },
    });
  }
};

const paymentIntentSucceededHandler = async (paymentIntent) => {
  const { type } = paymentIntent.metadata;

  switch (type) {
    case 'BOUGHT_PACKAGE':
      await handlePackagePurchase(paymentIntent);
      break;
    case 'CONFIRMED_JOB':
      await handleJobConfirmation(paymentIntent);
      break;
    default:
      logger.error(`Unhandled paymentIntent metadata type: ${type}`);
  }
};

module.exports = paymentIntentSucceededHandler;
