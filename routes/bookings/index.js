const express = require('express');

const router = express.Router();

// routes
router.use('/residential-power-outage', require('./residentialPowerOutage'));
router.use('/commercial-or-fleet-services', require('./commercialOrFleetServices'));
router.use('/construction-site', require('./constructionSite'));
router.use('/campsite', require('./campsite'));

module.exports = router;
