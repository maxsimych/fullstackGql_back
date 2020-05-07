import type { Application } from 'express';
import { expressLoader } from './express.loader';
import { mongooseLoader } from './mongoose.loader';
import { apolloLoader } from './apollo.loader';

export const loader = async (app: Application): Promise<void> => {
  await mongooseLoader();
  await expressLoader(app);
  await apolloLoader(app);
}