const crypto = require('crypto');
const { serverErrorResponse, okResponse, createSuccessResponse } = require('generic-response');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');
const s3 = require('../../config/s3.config');

const augmentFeedbacksWithImageUrls = (feedbacks) => {
  feedbacks.forEach((feedback) => {
    if (feedback.FeedbackImages) {
      feedback.FeedbackImages = feedback.FeedbackImages.map((imageObject) => ({
        ...imageObject,
        path: `${process.env.S3_ACCESS_URL}/${imageObject.fileName}`,
      }));
    }
  });

  return feedbacks;
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        FeedbackImages: true,
        User: true,
      },
    });

    const feedbacksWithImageUrls = augmentFeedbacksWithImageUrls(feedbacks);

    const response = okResponse(feedbacksWithImageUrls);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const uploadPicture = async (req, res) => {
  const { file } = req;

  try {
    const folderName = 'feedback-images';

    const randomImageName = crypto.randomBytes(32).toString('hex');

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${folderName}/${randomImageName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    const response = createSuccessResponse({ Key: `${folderName}/${randomImageName}` });
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const createFeedbacks = async (req, res) => {
  const { images, ...data } = req.body;
  const { userId } = req.user;

  try {
    const feedback = await prisma.feedback.create({
      data: {
        userId,
        ...data,
        FeedbackImages: {
          createMany: {
            data: images,
          },
        },
      },
      include: { FeedbackImages: true },
    });

    const response = createSuccessResponse(feedback);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllFeedbacks,
  uploadPicture,
  createFeedbacks,
};
