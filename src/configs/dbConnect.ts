import mongoose from 'mongoose';
import config from 'config';

const mongoUri = config.get<string>('mongoUri');

async function connectDB() {
  mongoose.set('strictQuery', false);

  await mongoose.connect(mongoUri);
}

export { connectDB };
