import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  updatedAt: Date;
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pendente', 'concluída'], default: 'pendente' }
});

taskSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
