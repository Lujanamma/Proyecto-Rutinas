import { createHabit, getHabitsByUser, getHabitById, updateHabit, deleteHabit } from '../repositories/habitRepository.js';

export const createHabitService = async (userId, habitData) => {
  return await createHabit({ ...habitData, user: userId });
};

export const getHabitsService = async (userId) => {
  return await getHabitsByUser(userId);
};

export const getHabitService = async (habitId, userId) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return habit;
};

export const updateHabitService = async (habitId, userId, updateData) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return await updateHabit(habitId, updateData);
};

export const deleteHabitService = async (habitId, userId) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return await deleteHabit(habitId);
};
