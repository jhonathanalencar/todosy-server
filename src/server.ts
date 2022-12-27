import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { connectDB } from './database/connect';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 3333;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
});

mongoose.connection.on('error', (error) => {
  if (error instanceof Error) {
    console.log(
      `Could not connect to MongoDB for the following reason:\n${error.name}: ${error.message}`
    );
  } else {
    console.log('Could not connect to MongoDB');
  }
  process.exit(1);
});
