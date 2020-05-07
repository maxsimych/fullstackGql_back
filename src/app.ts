import express from 'express';
import 'reflect-metadata';
import 'module-alias/register';
import { loader } from './loader';
import './iocContainer/iocContainer.config';
import './config';

const startServer = async () => {

  const app = express();

  await loader(app);

  app.listen(5000, err => {
    if (err) return console.error(err);

    console.log('Start listening port 5000');
  });
};

startServer();
