const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const geolib = require('geolib');
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

const createPaymentIntent = async (jobRequestId, amount) => {
  const amountInCents = amount * 1000;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: { jobRequestId },
  });

  return {
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };
};

const createJob = async (req, res) => {
  const { userId } = req.user;
  const data = req.body;

  try {
    const job = await prisma.jobRequests.create({
      data: {
        userId,
        ...data,
      },
    });

    const onlineDrivers = await prisma.users.findMany({
      where: {
        role: 'DRIVER',
        UserStatus: {
          some: {
            isOnline: true,
          },
        },
      },
      include: {
        DriversLocation: true,
      },
    });

    const driversWithinRadius = onlineDrivers.filter((driver) => {
      const distance = geolib.getDistance(
        { latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) },
        {
          latitude: parseFloat(driver.DriversLocation.latitude),
          longitude: parseFloat(driver.DriversLocation.longitude),
        },
      );
      return distance <= data.radius;
    });

    await Promise.all(
      driversWithinRadius.map(async (driver) => {
        await prisma.jobOffers.create({
          data: {
            jobRequestId: job.id,
            driverId: driver.id,
          },
        });
      }),
    );

    const response = okResponse(job);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateJob = async (req, res) => {
  const { userId } = req.user;
  const { jobId } = req.params;
  const data = req.body;

  try {
    const existingJob = await prisma.jobRequests.findUnique({ where: { id: jobId } });

    if (!existingJob) {
      const response = notFoundResponse(`Job with id: ${jobId} not found.`);
      return res.status(response.status.code).json(response);
    }

    if (existingJob.userId !== userId) {
      const response = unauthorizedResponse('Not your job');
      return res.status(response.status.code).json(response);
    }

    const job = await prisma.jobRequests.update({
      where: { id: jobId },
      data: {
        ...data,
      },
    });

    const onlineDrivers = await prisma.users.findMany({
      where: {
        role: 'DRIVER',
        UserStatus: {
          some: {
            isOnline: true,
          },
        },
      },
      include: {
        DriversLocation: true,
      },
    });

    const driversWithinRadius = onlineDrivers.filter((driver) => {
      const distance = geolib.getDistance(
        { latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) },
        {
          latitude: parseFloat(driver.DriversLocation.latitude),
          longitude: parseFloat(driver.DriversLocation.longitude),
        },
      );
      return distance <= data.radius;
    });

    await prisma.jobOffers.deleteMany({
      where: { jobRequestId: existingJob.id },
    });

    await Promise.all(
      driversWithinRadius.map(async (driver) => {
        await prisma.jobOffers.create({
          data: {
            jobRequestId: job.id,
            driverId: driver.id,
          },
        });
      }),
    );

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const acceptJob = async (req, res) => {
  const { userId } = req.user;
  const { jobOfferId } = req.params;

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
  const { jobOfferId } = req.params;

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
  const { userId } = req.user;
  const { jobOfferId: jobOfferIdStr } = req.user;

  try {
    const jobOfferId = Number(jobOfferIdStr);

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
      const response = unauthorizedResponse('not yours');
      return res.status(response.status.code).json(response);
    }

    if (jobRequest.hasAccepted) {
      const response = badRequestResponse('Already accepted.');
      return res.status(response.status.code).json(response);
    }

    await prisma.jobRequests.update({
      where: { id: jobRequest.id },
      data: { hasAccepted: true },
    });

    // price calculation logic

    // let pricePerMeter;

    // if (user.UserRescueCharges.chargesRemaining > 0) {
    //   pricePerMeter = user.UserPackages[0].Package.pricePerMile;
    // } else {
    //   pricePerMeter = process.env.PRICE_PER_METER;
    // }

    // ! price calculation logic

    const paymentIntent = await createPaymentIntent(jobRequest.id, 100);

    const response = okResponse({ paymentIntent });
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  createJob,
  updateJob,
  acceptJob,
  rejectJob,
  confirmJob,
};
