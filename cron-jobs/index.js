const cron = require('node-cron');
const taskDeadlineNotifier = require('./taskDeadlineNotifier');

cron.schedule('0 0 * * *', taskDeadlineNotifier);
// cron.schedule('*/1 * * * *', taskDeadlineNotifier);
