const crypto = require('crypto');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const {
  okResponse,
  serverErrorResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
  notFoundResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');
const s3 = require('../../config/s3.config');

const augmentProductsWithImageUrls = (products) => {
  products.forEach((product) => {
    if (product.ProductImages) {
      product.ProductImages = product.ProductImages.map((imageObject) => ({
        ...imageObject,
        path: `${process.env.S3_ACCESS_URL}/${imageObject.path}`,
      }));
    }
  });

  return products;
};

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany({ include: { ProductImages: true } });
    const productsWithImageUrls = augmentProductsWithImageUrls(products);

    const response = okResponse(productsWithImageUrls);
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
    const folderName = 'product-images';

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

const createProduct = async (req, res) => {
  const { images, ...data } = req.body;

  try {
    const product = await prisma.products.create({
      data: {
        ...data,
        ProductImages: {
          createMany: {
            data: images,
          },
        },
      },
      include: { ProductImages: true },
    });

    const response = createSuccessResponse(product);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateProduct = async (req, res) => {
  const productId = Number(req.params.productId);
  const { images, ...data } = req.body;

  try {
    const existingProduct = await prisma.products.findUnique({ where: { id: productId } });

    if (!existingProduct) {
      const response = notFoundResponse(`Product with id: ${productId} not found.`);
      return res.status(response.status.code).json(response);
    }

    const product = await prisma.products.update({
      where: { id: productId },
      data,
    });

    if (images) {
      await prisma.productImages.deleteMany({
        where: { productId },
      });

      await prisma.productImages.createMany({
        data: images.map((i) => ({ productId, ...i })),
      });
    }

    const response = updateSuccessResponse(product);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const deleteProduct = async (req, res) => {
  const productId = Number(req.params.productId);

  try {
    const existingProduct = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      const response = notFoundResponse(`Product with id: ${productId} not found`);
      return res.status(response.status.code).json(response);
    }

    const product = await prisma.products.delete({
      where: { id: productId },
      include: { ProductImages: true },
    });

    const deleteImagePromises = product.ProductImages.map(async (image) => {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: image.path,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    });

    await Promise.all(deleteImagePromises);

    const response = deleteSuccessResponse(product);
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllProducts,
  uploadPicture,
  createProduct,
  updateProduct,
  deleteProduct,
};
