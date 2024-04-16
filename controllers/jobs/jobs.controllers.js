const geolib = require('geolib');
const {
  okResponse,
  serverErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateSuccessResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getSingleJobRequest = async (req, res) => {
  const jobId = Number(req.params.jobId);
  const { userId } = req.user;

  try {
    const existingJob = await prisma.jobRequests.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      const response = notFoundResponse(`Job with id: ${jobId} not found.`);
      return res.status(response.status.code).json(response);
    }

    const jobOffers = await prisma.jobOffers.findMany({
      where: { jobRequestId: existingJob.id },
    });

    const driverIds = jobOffers.map((i) => i.driverId);

    if (existingJob.userId !== userId && !driverIds.some((i) => i === userId)) {
      const response = unauthorizedResponse();
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(existingJob);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const getConversationIdOfJobRequest = async (req, res) => {
  const jobId = Number(req.params.jobId);
  const { userId } = req.user;

  try {
    const existingJob = await prisma.jobRequests.findUnique({
      where: { id: jobId },
      include: { JobOffers: { where: { status: 'ACCEPTED' } } },
    });

    if (!existingJob) {
      const response = notFoundResponse(`Job with id: ${jobId} not found.`);
      return res.status(response.status.code).json(response);
    }

    if (existingJob.userId !== userId && existingJob.JobOffers[0].driverId !== userId) {
      const response = unauthorizedResponse();
      return res.status(response.status.code).json(response);
    }

    if (existingJob.conversationId === null) {
      const response = notFoundResponse(`Job with id: ${jobId} doesn't have conversation id yet.`);
      return res.status(response.status.code).json(response);
    }

    const response = okResponse({ conversationId: existingJob.conversationId });
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
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
        { latitude: parseFloat(job.latitude), longitude: parseFloat(job.longitude) },
        {
          latitude: parseFloat(driver.DriversLocation.latitude),
          longitude: parseFloat(driver.DriversLocation.longitude),
        },
      );

      const radiusInMeters = data.radius * 1609.34;
      return distance <= radiusInMeters;
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
  const jobId = Number(req.params.jobId);
  const { radius: radiusInMiles } = req.body;

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
      data: { radius: radiusInMiles },
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
        { latitude: parseFloat(job.latitude), longitude: parseFloat(job.longitude) },
        {
          latitude: parseFloat(driver.DriversLocation.latitude),
          longitude: parseFloat(driver.DriversLocation.longitude),
        },
      );

      const radiusInMeters = radiusInMiles * 1609.34;
      return distance <= radiusInMeters;
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

module.exports = {
  getSingleJobRequest,
  getConversationIdOfJobRequest,
  createJob,
  updateJob,
};
