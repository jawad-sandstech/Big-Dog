const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./feedbacks'));

module.exports = router;
