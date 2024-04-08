const geolib = require('geolib');
const { okResponse, serverErrorResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

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
      const mostRecentLocation = driver.DriversLocation.reduce((latest, current) => {
        return latest.updatedAt > current.updatedAt ? latest : current;
      }, driver.DriversLocation[0]);

      const distance = geolib.getDistance(
        { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
        {
          latitude: parseFloat(mostRecentLocation.latitude),
          longitude: parseFloat(mostRecentLocation.longitude),
        },
      );
      return distance <= radius;
    });

    const response = okResponse(job);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  createJob,
};
