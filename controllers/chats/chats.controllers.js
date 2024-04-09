const {
  serverErrorResponse,
  okResponse,
  unauthorizedResponse,
  notFoundResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');

const getAllMessages = async (req, res) => {
  const { chatId: chatIdStr } = req.params;

  const chatId = Number(chatIdStr);

  try {
    const messages = await prisma.messages.findMany({
      where: { conversationId: chatId },
    });

    const response = okResponse(messages);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createMessage = async (req, res) => {
  const { chatId: chatIdStr } = req.params;
  const { content } = req.body;
  const { userId } = req.user;

  const chatId = Number(chatIdStr);

  try {
    const existingConversation = await prisma.conversations.findUnique({
      where: { id: chatId },
      include: {
        JobRequests: {
          include: {
            JobOffers: {
              where: {
                status: 'ACCEPTED',
              },
            },
          },
        },
      },
    });

    if (!existingConversation) {
      const response = notFoundResponse(`Conversation with id: ${chatId} not found.`);
      return res.status(response.status.code).json(response);
    }

    if (
      existingConversation.JobRequests.userId !== userId &&
      existingConversation.JobRequests.JobOffers[0].driverId !== userId
    ) {
      const response = unauthorizedResponse();
      return res.status(response.status.code).json(response);
    }

    const messages = await prisma.messages.create({
      data: {
        conversationId: chatId,
        senderId: userId,
        content,
      },
    });

    const response = okResponse(messages);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
