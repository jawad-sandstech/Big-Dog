const express = require('express');
const passport = require('passport');

const validateRequest = require('../../middlewares/validateRequest.middleware');

const authValidations = require('../../validations/users/auth');
const authControllers = require('../../controllers/users/auth.controllers');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authControllers.loginWithGoogle,
);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authControllers.loginWithFacebook,
);
router.post(
  '/email',
  validateRequest(authValidations.loginWithEmail),
  authControllers.loginWithEmail,
);
router.post(
  '/phone-number',
  validateRequest(authValidations.loginWithNumber),
  authControllers.loginWithNumber,
);
router.post('/verify-otp', validateRequest(authValidations.verifyOtp), authControllers.verifyOtp);
router.post('/resend-otp', validateRequest(authValidations.resendOtp), authControllers.resendOtp);

module.exports = router;
