const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {
  okResponse,
  serverErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateSuccessResponse,
  badRequestResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const createPaymentIntent = async (amount, metadata) => {
  const amountInCents = amount * 1000;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      type: 'CONFIRMED_JOB',
      ...metadata,
    },
  });

  return {
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };
};

const acceptJob = async (req, res) => {
  const { userId } = req.user;
  const jobOfferId = Number(req.params.jobOfferId);

  try {
    const existingJobOffer = await prisma.jobOffers.findUnique({ where: { id: jobOfferId } });

    if (!existingJobOffer) {
      const response = notFoundResponse(`job offer with id: ${jobOfferId} not found.`);
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.driverId !== userId) {
      const response = unauthorizedResponse();
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status === 'EXPIRED') {
      const response = badRequestResponse('job offer has been expired.');
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status === 'DECLINED') {
      const response = badRequestResponse('job offer has been declined.');
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status === 'ACCEPTED') {
      const response = badRequestResponse('job offer has already been accepted.');
      return res.status(response.status.code).json(response);
    }

    const acceptedJobOffer = await prisma.jobOffers.findFirst({
      where: { jobRequestId: existingJobOffer.jobRequestId, status: 'ACCEPTED' },
    });

    if (acceptedJobOffer) {
      const response = badRequestResponse('job offer has been accepted by someone else.');
      return res.status(response.status.code).json(response);
    }

    await prisma.jobOffers.update({
      where: { id: jobOfferId },
      data: { status: 'ACCEPTED' },
    });

    const response = updateSuccessResponse(null, 'job offer has been accepted.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const rejectJob = async (req, res) => {
  const { userId } = req.user;
  const jobOfferId = Number(req.params.jobOfferId);

  try {
    const existingJobOffer = await prisma.jobOffers.findUnique({ where: { id: jobOfferId } });

    if (!existingJobOffer) {
      const response = notFoundResponse(`job offer with id: ${jobOfferId} not found.`);
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.driverId !== userId) {
      const response = unauthorizedResponse();
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status === 'EXPIRED') {
      const response = badRequestResponse('job offer has been expired.');
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status === 'ACCEPTED') {
      const response = badRequestResponse('job offer has been accepted.');
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status === 'DECLINED') {
      const response = badRequestResponse('job offer has already been declined.');
      return res.status(response.status.code).json(response);
    }

    await prisma.jobOffers.update({
      where: { id: jobOfferId },
      data: { status: 'DECLINED' },
    });

    const response = updateSuccessResponse(null, 'job offer has been rejected.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const confirmJob = async (req, res) => {
  const jobOfferId = Number(req.params.jobOfferId);
  const { userId } = req.user;

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        UserPackages: {
          where: {
            isActive: true,
            expireAt: {
              gt: new Date(),
            },
          },
          include: { Package: true },
        },
        UserRescueCharges: true,
      },
    });

    const existingJobOffer = await prisma.jobOffers.findUnique({
      where: { id: jobOfferId },
      include: { JobRequest: true },
    });

    if (!existingJobOffer) {
      const response = notFoundResponse(`job offer with id: ${jobOfferId} not found.`);
      return res.status(response.status.code).json(response);
    }

    const jobRequest = existingJobOffer.JobRequest;

    if (jobRequest.userId !== userId) {
      const response = unauthorizedResponse('Not yours, Why you paying?');
      return res.status(response.status.code).json(response);
    }

    if (existingJobOffer.status !== 'ACCEPTED') {
      const response = badRequestResponse('The job offer not accepted, Why you paying?');
      return res.status(response.status.code).json(response);
    }

    await prisma.jobRequests.update({
      where: { id: jobRequest.id },
      data: { hasAccepted: true },
    });

    // price calculation logic

    let pricePerMeter;
    let decrementRemainingCharges;

    if (user.UserRescueCharges?.chargesRemaining > 0) {
      pricePerMeter = user.UserPackages[0].Package.pricePerMile;
      decrementRemainingCharges = true;
    } else {
      pricePerMeter = process.env.PRICE_PER_METER;
      decrementRemainingCharges = false;
    }

    // ! price calculation logic

    const paymentIntent = await createPaymentIntent(100, {
      jobRequestId: jobRequest.id,
      userId: user.id,
      userEmail: user.email,
      userPhoneNumber: user.phoneNumber,
      decrementRemainingCharges,
    });

    const response = okResponse({ paymentIntent });
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  acceptJob,
  rejectJob,
  confirmJob,
};
