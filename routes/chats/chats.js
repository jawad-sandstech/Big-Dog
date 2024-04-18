const express = require('express');

const authRequired = require('../../middlewares/authRequired.middleware');
const validateRequest = require('../../middlewares/validateRequest.middleware');

const chatsValidations = require('../../validations/chats/chats');
const chatsControllers = require('../../controllers/chats/chats.controllers');

const router = express.Router();

router.get(
  '/:chatId',
  authRequired(),
  validateRequest(chatsValidations.getAllMessages),
  chatsControllers.getAllMessages,
);
router.post(
  '/:chatId',
  authRequired(),
  validateRequest(chatsValidations.createMessage),
  chatsControllers.createMessage,
);

module.exports = router;
