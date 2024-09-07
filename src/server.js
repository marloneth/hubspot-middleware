import express from 'express';
import cors from 'cors';
import routes from './routes';

export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/api', routes);
  return app;
}

export default createServer;
