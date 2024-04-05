const moment = require('moment');
const jwt = require('jsonwebtoken');
const {
  okResponse,
  serverErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
} = require('generic-response');

const prisma = require('../../config/database.config');
// const twilio = require('../../config/twilio.config');
const logger = require('../../config/logger.config');

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

// const sendOtpEmail = async (email, otp) => {};

// const sendOtpSms = async (phoneNumber, otp) => {
//   try {
//     await twilio.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phoneNumber,
//     });
//     logger.log('OTP sent successfully');
//   } catch (error) {
//     logger.error('Error sending OTP:', error);
//   }
// };

const expireOTP = async (id) => {
  await prisma.userOTP.update({
    where: { id },
    data: { isExpired: true },
  });
};

const loginWithEmail = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      user = await prisma.users.create({
        data: {
          email,
          loginMethod: 'EMAIL',
        },
      });
    }

    const otp = generateOTP();
    const expirationDateTime = moment().add(5, 'minutes').toISOString();

    await prisma.userOTP.create({
      data: {
        userId: user.id,
        otp,
        otpType: 'EMAIL',
        isExpired: false,
        expirationDateTime,
      },
    });

    // await sendOtpEmail(email, otp);

    const response = okResponse(null, 'OTP sent successfully.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const loginWithNumber = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    let user = await prisma.users.findFirst({
      where: { phoneNumber },
    });

    if (!user) {
      user = await prisma.users.create({
        data: {
          phoneNumber,
          loginMethod: 'PHONE_NUMBER',
        },
      });
    }

    const otp = generateOTP();
    const expirationDateTime = moment().add(5, 'minutes').toISOString();

    await prisma.userOTP.create({
      data: {
        userId: user.id,
        otp,
        otpType: 'PHONE_NUMBER',
        isExpired: false,
        expirationDateTime,
      },
    });

    // await sendOtpSms(phoneNumber, otp);

    const response = okResponse(null, 'OTP sent successfully.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const loginWithGoogle = (req, res) => {
  logger.log('from callback', req.user);
  res.redirect(process.env.FRONTEND_URL);
};

const loginWithFacebook = (req, res) => {
  logger.log('from callback', req.user);
  res.redirect(process.env.FRONTEND_URL);
};

const verifyOtp = async (req, res) => {
  const { email, phoneNumber, otp } = req.body;

  let verificationTarget;
  let verificationField;

  if (email) {
    verificationTarget = { email };
    verificationField = 'isEmailVerified';
  } else if (phoneNumber) {
    verificationTarget = { phoneNumber };
    verificationField = 'isPhoneNumberVerified';
  }

  try {
    const user = await prisma.users.findFirst({
      where: verificationTarget,
      include: { Role: true },
    });

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    const userOTP = await prisma.userOTP.findFirst({
      where: {
        userId: user.id,
        otp,
        isExpired: false,
      },
    });

    if (!userOTP) {
      const response = unauthorizedResponse('Invalid OTP or OTP expired');
      return res.status(response.status.code).json(response);
    }

    await expireOTP(userOTP.id);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        [verificationField]: true,
      },
    });

    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.Role?.name || null,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const response = okResponse({ token, user: payload }, 'OTP verified.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

const resendOtp = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    let user;

    if (email) {
      user = await prisma.users.findFirst({ where: { email } });
    } else if (phoneNumber) {
      user = await prisma.users.findFirst({ where: { phoneNumber } });
    }

    if (!user) {
      const response = notFoundResponse('User not found');
      return res.status(response.status.code).json(response);
    }

    await prisma.userOTP.updateMany({
      where: {
        userId: user.id,
        isExpired: false,
      },
      data: { isExpired: true },
    });

    const otp = generateOTP();
    const expirationDateTime = moment().add(5, 'minutes').toISOString();

    await prisma.userOTP.create({
      data: {
        userId: user.id,
        otp,
        expirationDateTime,
        otpType: email ? 'EMAIL' : 'PHONE_NUMBER',
      },
    });

    if (email) {
      // await sendOtpEmail(email, otp);
    } else if (phoneNumber) {
      // await sendOtpSms(phoneNumber, otp);
    }

    const response = okResponse(null, 'OTP resent successfully');
    return res.status(response.status.code).json(response);
  } catch (error) {
    logger.error(error.message);
    const response = serverErrorResponse(error.message);
    return res.status(response.status.code).json(response);
  }
};

module.exports = {
  loginWithEmail,
  loginWithNumber,
  loginWithGoogle,
  loginWithFacebook,
  verifyOtp,
  resendOtp,
};
