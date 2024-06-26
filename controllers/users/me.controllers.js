const crypto = require('crypto');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const {
  okResponse,
  serverErrorResponse,
  notFoundResponse,
  updateSuccessResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');
const s3 = require('../../config/s3.config');

const getMyProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    if (user.profilePicture) {
      user.profilePicture = `${process.env.S3_ACCESS_URL}/${user.profilePicture}`;
    }

    const response = okResponse(user);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const uploadPicture = async (req, res) => {
  const { file } = req;
  const { userId } = req.user;

  try {
    const folderName = 'user-profiles';

    const randomImageName = crypto.randomBytes(32).toString('hex');

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${folderName}/${randomImageName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    await prisma.users.update({
      where: { id: userId },
      data: { profilePicture: `${folderName}/${randomImageName}` },
    });

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { address, ...data } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    if (data.email) {
      const existingEmail = await prisma.users.findFirst({ where: { email: data.email } });

      if (existingEmail) {
        const response = notFoundResponse('This email is already taken.');
        return res.status(response.status.code).json(response);
      }
    }

    if (data.phoneNumber) {
      const existingPhoneNumber = await prisma.users.findFirst({ where: { email: data.email } });

      if (existingPhoneNumber) {
        const response = notFoundResponse('This phone number is already taken.');
        return res.status(response.status.code).json(response);
      }
    }

    await prisma.users.update({
      where: { id: userId },
      data: {
        ...data,
      },
    });

    await prisma.userAddress.create({
      data: {
        userId,
        ...address,
      },
    });

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateLocation = async (req, res) => {
  const { userId } = req.user;
  const { latitude, longitude } = req.body;

  try {
    const existingDriversLocation = await prisma.driversLocation.findFirst({
      where: { userId },
    });

    if (existingDriversLocation) {
      await prisma.driversLocation.update({
        where: { id: existingDriversLocation.id },
        data: { latitude, longitude },
      });
    } else {
      await prisma.driversLocation.create({
        data: {
          userId,
          latitude,
          longitude,
        },
      });
    }

    const response = okResponse(null, 'User location updated successfully.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getMyProfile,
  uploadPicture,
  updateProfile,
  updateLocation,
};
