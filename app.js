const express = require('express');
const cors = require('cors');
const passport = require('passport');
// const reqResInspector = require('express-req-res-inspector');

require('./config/auth/google.config');
require('./config/auth/facebook.config');

const stripeWebhookHandler = require('./webhooks');

const app = express();

app.post('/api/v1/stripe-webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.static('uploads'));
app.use(express.json({ limit: '100mb' }));
app.use(cors());
app.use(passport.initialize());
// app.use(reqResInspector());

require('./cron-jobs/index');

app.use('/api/v1', require('./routes/index'));

module.exports = app;
