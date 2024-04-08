const cron = require('node-cron');

const expireOldOTPs = require('./handlers/expireOldOTPs');
const expireJobOffers = require('./handlers/expireJobOffers');

cron.schedule('* * * * *', expireOldOTPs);
cron.schedule('* * * * *', expireJobOffers);
