import cors from 'cors';
import type { Application } from 'express';

export const expressLoader = (app: Application): Application => {

  app.disable('x-powered-by');

  app.use(cors());

  return app;
}