const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./jobs'));

module.exports = router;
