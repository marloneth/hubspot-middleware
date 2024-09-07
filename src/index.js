import { APP_PORT, createLogger } from './config';
import createServer from './server';

const logger = createLogger('index.js');
const app = createServer();
const port = APP_PORT;

app.listen(port, () => {
  logger.info('🌎 Server running ...');
  logger.info(`Listening on port ${port}`);
});
