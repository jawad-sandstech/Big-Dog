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

const addVehicleInfo = async (req, res) => {
  const { userId } = req.user;
  const data = req.body;

  try {
    const existingVehicle = await prisma.userVehicles.findFirst({
      where: { userId },
    });

    if (existingVehicle) {
      const response = badRequestResponse('Already created.');
      return res.status(response.status.code).json(response);
    }

    const vehicle = await prisma.userVehicles.create({
      data: {
        userId,
        ...data,
      },
    });

    const response = okResponse(vehicle);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateVehicleInfo = async (req, res) => {
  const { vehicleId: vehicleIdStr } = req.params;
  const { userId } = req.user;
  const data = req.body;

  try {
    const vehicleId = Number(vehicleIdStr);

    const existingVehicle = await prisma.userVehicles.findFirst({
      where: { id: vehicleId },
    });

    if (!existingVehicle) {
      const response = notFoundResponse(`Vehicle with id: ${vehicleId} not found.`);
      return res.status(response.status.code).json(response);
    }

    if (existingVehicle.userId !== userId) {
      const response = unauthorizedResponse();
      return res.status(response.status.code).json(response);
    }

    const updatedVehicle = await prisma.userVehicles.update({
      where: { id: vehicleId },
      data,
    });

    const response = updateSuccessResponse(updatedVehicle);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  addVehicleInfo,
  updateVehicleInfo,
};
