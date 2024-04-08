const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./chats'));

module.exports = router;
