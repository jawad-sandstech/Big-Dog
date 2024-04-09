const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { okResponse, serverErrorResponse, notFoundResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const createPaymentIntent = async (user, packageDeal) => {
  const amountInCents = packageDeal.price * 1000;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      userId: user.id,
      userEmail: user.email,
      userPhoneNumber: user.phoneNumber,
      packageId: packageDeal.id,
      packageName: packageDeal.name,
      packagePrice: packageDeal.price,
    },
  });

  return {
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };
};

const getCurrentPackage = async (req, res) => {
  const { userId } = req.user;

  try {
    const currentDate = moment();

    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: {
        UserRescueCharges: true,
        UserPackages: {
          where: {
            isActive: true,
            expireAt: { gt: currentDate },
          },
          include: {
            Package: true,
          },
        },
      },
    });

    if (!user) {
      const response = okResponse(null, 'Could not find any package.');
      return res.status(response.status.code).json(response);
    }

    const response = okResponse({
      UserPackages: user.UserPackages[0].Package,
      UserRescueCharges: user.UserRescueCharges[0],
    });
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const buyPackage = async (req, res) => {
  const { packageId } = req.body;
  const { userId } = req.user;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: { UserAddress: true },
    });

    const packageDeal = await prisma.packages.findFirst({
      where: { id: packageId },
    });

    if (!packageDeal) {
      const response = notFoundResponse(`Package with id: ${packageId} not found`);
      return res.status(response.status.code).json(response);
    }

    const paymentIntent = await createPaymentIntent(user, packageDeal);

    const response = okResponse({ paymentIntent }, 'created Payment intent successfully.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getCurrentPackage,
  buyPackage,
};
