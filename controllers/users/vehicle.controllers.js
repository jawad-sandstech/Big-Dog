const {
  okResponse,
  serverErrorResponse,
  updateSuccessResponse,
  badRequestResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getVehicleInfo = async (req, res) => {
  const { userId } = req.user;

  try {
    const existingVehicle = await prisma.userVehicles.findFirst({
      where: { userId },
    });

    const response = okResponse(existingVehicle);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

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
  const { userId } = req.user;
  const data = req.body;

  try {
    const existingVehicle = await prisma.userVehicles.findFirst({
      where: { userId },
    });

    if (!existingVehicle) {
      const response = badRequestResponse('No Vehicle to update.');
      return res.status(response.status.code).json(response);
    }

    const updatedVehicle = await prisma.userVehicles.update({
      where: { id: existingVehicle.id },
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
  getVehicleInfo,
  addVehicleInfo,
  updateVehicleInfo,
};
