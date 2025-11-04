import Habit from '../models/Habit.js';

export const createHabit = async (habitData) => {
  const habit = new Habit(habitData);
  return await habit.save();
};

export const getHabitsByUser = async (userId) => {
  return await Habit.find({ user: userId });
};

export const getHabitById = async (habitId) => {
  return await Habit.findById(habitId);
};

export const updateHabit = async (habitId, updateData) => {
  return await Habit.findByIdAndUpdate(habitId, updateData, { new: true });
};

export const deleteHabit = async (habitId) => {
  return await Habit.findByIdAndDelete(habitId);
};
