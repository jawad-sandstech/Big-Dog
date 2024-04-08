const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../config/logger.config');
const paymentIntentSucceededHandler = require('./handlers/paymentIntentSucceededHandler');

const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      paymentIntentSucceededHandler(event.data.object);
      break;
    default:
      logger.warn(`Unexpected webhook event type: ${event.type}`);
  }

  res.status(200).end();
};

module.exports = stripeWebhookHandler;
