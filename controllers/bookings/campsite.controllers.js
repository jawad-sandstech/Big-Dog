const { okResponse, createSuccessResponse, serverErrorResponse } = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.campsite.findMany();

    const response = okResponse(bookings);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createBooking = async (req, res) => {
  const data = req.body;

  try {
    const booking = await prisma.campsite.create({ data });

    const response = createSuccessResponse(booking);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllBookings,
  createBooking,
};
