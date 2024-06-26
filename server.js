const { createServer } = require('node:http');

const env = require('dotenv');
const path = require('path');

const logger = require('./config/logger.config');

const createSocketConnection = require('./socket');

if (process.env.NODE_ENV === 'dev') {
  env.config({ path: path.join(__dirname, '.env.dev') });
} else if (process.env.NODE_ENV === 'stage') {
  env.config({ path: path.join(__dirname, '.env.stage') });
} else if (process.env.NODE_ENV === 'qa') {
  env.config({ path: path.join(__dirname, '.env.qa') });
} else {
  env.config();
}

const app = require('./app');

const server = createServer(app);
createSocketConnection(server);

server.listen(process.env.PORT, () => {
  logger.info(`listening on ${process.env.PORT}`);
});
