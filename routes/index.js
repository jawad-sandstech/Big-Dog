const express = require('express');

const router = express.Router();

// routes
router.use('/users', require('./users'));
router.use('/packages', require('./packages'));
router.use('/user-packages', require('./userPackages'));

module.exports = router;
