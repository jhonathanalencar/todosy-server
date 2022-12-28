import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'express-async-errors';
import 'dotenv/config';

import { connectDB } from './configs/dbConnect';
import { logEvents } from './utils/logEvents';

import { logger } from './middlewares/logger';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(logger);

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
