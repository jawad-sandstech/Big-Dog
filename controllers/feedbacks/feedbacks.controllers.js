const crypto = require('crypto');
const { serverErrorResponse, okResponse, createSuccessResponse } = require('generic-response');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');
const s3 = require('../../config/s3.config');

const createFeedbackImages = async (feedbackId, images) => {
  const folderName = 'feedback-images';

  const createImagePromises = images.map(async (image) => {
    const randomImageName = crypto.randomBytes(32).toString('hex');

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${folderName}/${randomImageName}`,
      Body: image.buffer,
      ContentType: image.mimetype,
    });

    await s3.send(command);

    return prisma.feedbackImages.create({
      data: {
        feedbackId,
        originalName: image.originalname,
        fileName: `${folderName}/${randomImageName}`,
        mimetype: image.mimetype,
        size: image.size,
      },
    });
  });

  await Promise.all(createImagePromises);
};

const augmentFeedbacksWithImageUrls = (feedbacks) => {
  feedbacks.forEach((feedback) => {
    if (feedback.FeedbackImages) {
      feedback.FeedbackImages = feedback.FeedbackImages.map((imageObject) => ({
        ...imageObject,
        imageUrl: `${process.env.S3_ACCESS_URL}/${imageObject.fileName}`,
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

const createFeedbacks = async (req, res) => {
  const data = req.body;
  const images = req.files;
  const { userId } = req.user;

  try {
    const feedback = await prisma.feedback.create({
      data: {
        ...data,
        userId,
      },
    });

    if (images.length) {
      await createFeedbackImages(feedback.id, images);
    }

    const response = createSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllFeedbacks,
  createFeedbacks,
};
