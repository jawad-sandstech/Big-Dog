const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');

const logger = require('./config/logger.config');
const prisma = require('./config/database.config');

const updateOnlineStatus = async (userId, isOnline) => {
  try {
    const existingStatus = await prisma.userStatus.findUnique({
      where: { userId },
    });

    if (existingStatus) {
      await prisma.userStatus.update({
        where: { id: existingStatus.id },
        data: { isOnline, lastSeen: new Date() },
      });
    } else {
      await prisma.userStatus.create({
        data: { userId, isOnline, lastSeen: new Date() },
      });
    }
  } catch (error) {
    logger.error(`Error updating online status: ${error.message}`);
  }
};

const handleConnection = async (socket) => {
  logger.log('a user connected', socket.id);

  const authorizationHeader = socket.handshake.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (!token) {
    logger.log('No token provided', socket.id);
    socket.disconnect(true);
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // eslint-disable-next-line no-param-reassign
    socket.user = decodedToken;
    global.connectedSockets[socket.id] = socket;

    if (socket.user && socket.user.role === 'DRIVER') {
      await updateOnlineStatus(decodedToken.id, true);
    }
  } catch (error) {
    logger.error(`JWT verification failed: ${error.message}`);
    socket.disconnect(true);
  }
};

const handleJoinChat = async (socket, chatId) => {
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
      logger.log(`Conversation ${chatId} not found.`);
      socket.emit('error', 'Conversation not found.');
      return;
    }

    if (
      existingConversation.JobRequests.userId !== socket.user.id &&
      existingConversation.JobRequests.JobOffers[0].driverId !== socket.user.id
    ) {
      logger.log(`User ${socket.user.id} unauthorized to join chat ${chatId}`);
      socket.emit('error', 'Unauthorized access to chat.');
      return;
    }

    socket.join(chatId);
    logger.log(`User ${socket.user.id} joined chat ${chatId}`);
  } catch (error) {
    logger.error(`Error joining chat: ${error.message}`);
    socket.emit('error', 'Failed to join chat.');
  }
};

const handleDisconnect = async (socket) => {
  delete global.connectedSockets[socket.id];
  logger.log('user disconnected', socket.id);

  if (socket.user && socket.user.role === 'DRIVER') {
    await updateOnlineStatus(socket.user.id, false);
  }
};

const createSocketConnection = (server) => {
  global.connectedSockets = {};

  const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    handleConnection(socket);

    socket.on('joinChat', (chatId) => {
      handleJoinChat(socket, chatId);
    });

    socket.on('disconnect', () => {
      handleDisconnect(socket);
    });
  });
};

module.exports = createSocketConnection;
