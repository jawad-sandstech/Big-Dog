const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./packages'));

module.exports = router;
