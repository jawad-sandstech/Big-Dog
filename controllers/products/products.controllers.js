const crypto = require('crypto');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const {
  okResponse,
  serverErrorResponse,
  createSuccessResponse,
  updateSuccessResponse,
  deleteSuccessResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
const logger = require('../../config/logger.config');
const s3 = require('../../config/s3.config');

const createProductImages = async (productId, images) => {
  const folderName = 'product-images';

  const createImagePromises = images.map(async (image, index) => {
    const randomImageName = crypto.randomBytes(32).toString('hex');

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${folderName}/${randomImageName}`,
      Body: image.buffer,
      ContentType: image.mimetype,
    });

    await s3.send(command);

    await prisma.productImages.create({
      data: {
        productId,
        originalName: image.originalname,
        fileName: `${folderName}/${randomImageName}`,
        mimetype: image.mimetype,
        size: image.size,
        isPrimary: index === 0,
      },
    });
  });

  await Promise.all(createImagePromises);
};

const deleteProductImages = async (productImages) => {
  const deleteImagePromises = productImages.map(async (image) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: image.fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    return prisma.productImages.delete({
      where: { id: image.id },
    });
  });

  await Promise.all(deleteImagePromises);
};

const augmentProductsWithImageUrls = (products) => {
  products.forEach((product) => {
    if (product.ProductImages) {
      product.ProductImages = product.ProductImages.map((imageObject) => ({
        ...imageObject,
        imageUrl: `${process.env.S3_ACCESS_URL}/${imageObject.fileName}`,
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

const createProduct = async (req, res) => {
  const { categoryId: categoryIdStr, ...data } = req.body;
  const images = req.files;

  try {
    const categoryId = Number(categoryIdStr);

    const product = await prisma.products.create({
      data: {
        categoryId,
        ...data,
      },
    });

    if (images.length) {
      await createProductImages(product.id, images);
    }

    const response = createSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const updateProduct = async (req, res) => {
  const productId = Number(req.params.productId);
  const data = req.body;
  const images = req.files;

  try {
    await prisma.products.update({ where: { id: productId }, data });

    if (images.length) {
      const productImages = await prisma.productImages.findMany({ where: { productId } });

      await deleteProductImages(productImages);
      await createProductImages(productId, images);
    }

    const response = updateSuccessResponse();
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
    const product = await prisma.products.delete({
      where: { id: productId },
      include: { ProductImages: true },
    });

    const deleteImagePromises = product.ProductImages.map(async (image) => {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: image.fileName,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    });

    await Promise.all(deleteImagePromises);

    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
