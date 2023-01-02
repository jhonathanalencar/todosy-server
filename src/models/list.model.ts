import mongoose from 'mongoose';

interface IList {
  _id: string;
  title: string;
  todos: mongoose.Types.ObjectId[];
  completed: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const listSchema = new mongoose.Schema<IList>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    todos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Todo',
      default: [],
    },
    completed: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model<IList>('List', listSchema);

export { List, IList };
