const express = require('express');

const router = express.Router();

// routes
router.use('/auth', require('./auth'));
router.use('/role', require('./role'));
router.use('/', require('./users'));

module.exports = router;
