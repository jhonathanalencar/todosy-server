import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  plan: 'free' | 'pro';
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt
    .compare(candidatePassword, this.password)
    .catch(() => false);
};

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser };
