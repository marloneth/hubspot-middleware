import express from 'express';
import cors from 'cors';
import { APP_PORT, createLogger } from './config';
import routes from './routes';

const logger = createLogger('index.js');
const app = express();
const port = APP_PORT;

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.listen(port, () => {
  logger.info('🌎 Server running ...');
  logger.info(`Listening on port ${port}`);
});
