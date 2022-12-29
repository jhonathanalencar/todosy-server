import mongoose from 'mongoose';

interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  plan: 'free' | 'pro';
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      require: [true, 'Name required'],
    },
    email: {
      type: String,
      require: [true, 'Email required'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Password required'],
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
