const express = require('express');

const router = express.Router();

// routes
router.use('/', require('./userPackages'));

module.exports = router;
