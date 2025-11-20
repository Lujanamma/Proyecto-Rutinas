import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    completedDates: [
      {
        type: Date,
      },
    ],
    emoji: {
      type: String,
      default: '🌱',
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
