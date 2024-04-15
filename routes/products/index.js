const express = require('express');

const router = express.Router();

// routes
router.use('/categories', require('./categories'));
router.use('/orders', require('./orders'));
router.use('/', require('./products'));

module.exports = router;
