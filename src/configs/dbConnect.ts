import mongoose from 'mongoose';
import config from 'config';

const mongoUri = config.get<string>('mongoUri');

async function connectDB() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.log('Could not connect to MongoDB for the following reason:');
    console.error(error);
  }
}

export { connectDB };
