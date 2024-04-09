const cron = require('node-cron');

const expireOldOTPs = require('./handlers/expireOldOTPs');
const expireJobOffers = require('./handlers/expireJobOffers');
const expireUserPackages = require('./handlers/expireUserPackages');

cron.schedule('* * * * *', expireOldOTPs);
cron.schedule('* * * * *', expireJobOffers);
cron.schedule('* * * * *', expireUserPackages);
