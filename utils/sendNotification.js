const prisma = require('../config/database.config');
const firebase = require('../config/firebase.config');
const logger = require('../config/logger.config');

const sendNotification = async (userId, title, description) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { UserPreference: true },
    });

    await prisma.userNotifications.create({
      data: {
        userId,
        title,
        description,
      },
    });

    if (user?.UserPreference.receivePushNotifications) {
      const message = {
        notification: {
          title,
          body: description,
        },
        token: user.fcmToken,
      };

      await firebase.messaging().send(message);
    }
  } catch (error) {
    logger.error('Error sending notification:', error);
  }
};

module.exports = sendNotification;
