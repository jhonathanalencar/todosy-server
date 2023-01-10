import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import cors from 'cors';
import mongoose from 'mongoose';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

import { connectDB } from './configs/dbConnect';
import { corsOptions } from './configs/corsOptions';
import { logEvents } from './utils';

import { logger, errorHandler } from './middlewares';
import { router } from './routes';

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(logger);

app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.use(router);

app.all('*', (request, response) => {
  response.status(404);

  if (request.accepts('html') !== undefined) {
    response.sendFile(path.resolve(__dirname, 'views', '404.html'));
  } else if (request.accepts('json') !== undefined) {
    response.json({ message: '404 | Not Found' });
  } else {
    response.type('txt').send('404 | Not Found');
  }
});

app.use(errorHandler);

const PORT = process.env.PORT ?? 3333;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
});

mongoose.connection.on('error', (error) => {
  if (error instanceof Error) {
    logEvents(`${error.name}: ${error.message}`, 'mongoErrorLog.log');
  } else if (error instanceof mongoose.mongo.MongoServerError) {
    logEvents(
      `${error.codeName}: ${error.code}\t${error.message}`,
      'mongoErrorLog.log'
    );
  } else {
    logEvents(error, 'mongoErrorLog.log');
  }
});
