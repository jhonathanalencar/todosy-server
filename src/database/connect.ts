import mongoose from 'mongoose';

async function connectDB() {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://127.0.0.1:27017/todosy_db');
  } catch (error) {}
}

export { connectDB };
