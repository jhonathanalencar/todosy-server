import mongoose from 'mongoose';

interface ITodo {
  _id: string;
  task: string;
  completed: Date | null;
  createdBy: mongoose.Types.ObjectId;
  createdOn: mongoose.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>({
  task: {
    type: String,
    required: [true, 'Task is required'],
    unique: true,
  },
  completed: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User',
  },
  createdOn: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'List ID is required'],
    ref: 'List',
  },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export { Todo, ITodo };
