const express = require('express');

const router = express.Router();

// routes
router.use('/users', require('./users'));
router.use('/packages', require('./packages'));
router.use('/user-packages', require('./userPackages'));
router.use('/jobs', require('./jobs'));
router.use('/chats', require('./chats'));
router.use('/feedbacks', require('./feedbacks'));
router.use('/products', require('./products'));

module.exports = router;
