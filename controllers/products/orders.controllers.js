const {
  okResponse,
  serverErrorResponse,
  createSuccessResponse,
  notFoundResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: { OrderDetails: true, User: true },
    });

    const response = okResponse(orders);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const getSingleOrder = async (req, res) => {
  const orderId = Number(req.params.orderId);

  try {
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
      include: { OrderDetails: true, User: true },
    });

    if (!order) {
      const response = notFoundResponse();
      return res.status(response.status.code).json(response);
    }

    const response = okResponse(order);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createOrder = async (req, res) => {
  const { userId } = req.user;
  const orderData = req.body;

  try {
    const products = await prisma.products.findMany({
      where: {
        id: {
          in: orderData.orderItems.map((item) => item.productId),
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    const totalAmount = orderData.orderItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      return acc + product.price * item.quantity;
    }, 0);

    const order = await prisma.orders.create({
      data: {
        userId,
        totalAmount,
        OrderDetails: {
          create: orderData.orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: products.find((p) => p.id === item.productId).price,
          })),
        },
      },
      include: {
        OrderDetails: true,
      },
    });

    const response = createSuccessResponse(order);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
};
