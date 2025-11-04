import {
  createHabit,
  getHabitsByUser,
  getHabitById,
  updateHabit,
  deleteHabit,
  addCompletedDate,
} from '../repositories/habitRepository.js';

// Crear nuevo hábito
export const createHabitService = async (userId, habitData) => {
  return await createHabit({ ...habitData, user: userId });
};

// Listar hábitos de un usuario
export const getHabitsService = async (userId) => {
  return await getHabitsByUser(userId);
};

// Obtener hábito específico
export const getHabitService = async (habitId, userId) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return habit;
};

// Actualizar hábito
export const updateHabitService = async (habitId, userId, updateData) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return await updateHabit(habitId, updateData);
};

// Eliminar hábito
export const deleteHabitService = async (habitId, userId) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return await deleteHabit(habitId);
};

// Marcar hábito como completado (por defecto hoy)
export const markHabitCompletedService = async (habitId, userId, date = new Date()) => {
  const habit = await getHabitById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');
  if (habit.user.toString() !== userId) throw new Error('No autorizado');
  return await addCompletedDate(habitId, date);
};
