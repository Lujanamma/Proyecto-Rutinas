import Habit from '../models/Habit.js';

// Crear hábito
export const createHabit = async (habitData) => {
  const habit = new Habit(habitData);
  return await habit.save();
};

// Obtener hábitos de un usuario
export const getHabitsByUser = async (userId) => {
  return await Habit.find({ user: userId }).sort({ createdAt: -1 });
};

// Obtener hábito por ID
export const getHabitById = async (habitId) => {
  return await Habit.findById(habitId);
};

// Actualizar hábito
export const updateHabit = async (habitId, updateData) => {
  return await Habit.findByIdAndUpdate(habitId, updateData, { new: true });
};

// Eliminar hábito
export const deleteHabit = async (habitId) => {
  return await Habit.findByIdAndDelete(habitId);
};

// Marcar hábito como completado en una fecha
export const addCompletedDate = async (habitId, date) => {
  const habit = await Habit.findById(habitId);
  if (!habit) throw new Error('Hábito no encontrado');

  const exists = habit.completedDates.some(
    (d) => d.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
  );

  if (!exists) {
    habit.completedDates.push(date);
    await habit.save();
  }

  return habit;
};
