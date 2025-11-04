import {
  createHabitService,
  getHabitsService,
  getHabitService,
  updateHabitService,
  deleteHabitService,
  markHabitCompletedService,
} from '../services/habitService.js';

// Crear un hábito
export const createHabitController = async (req, res) => {
  try {
    const habit = await createHabitService(req.user.id, req.body);
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos los hábitos del usuario
export const getHabitsController = async (req, res) => {
  try {
    const habits = await getHabitsService(req.user.id);
    res.json(habits);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un hábito por ID
export const getHabitController = async (req, res) => {
  try {
    const habit = await getHabitService(req.params.id, req.user.id);
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un hábito
export const updateHabitController = async (req, res) => {
  try {
    const habit = await updateHabitService(req.params.id, req.user.id, req.body);
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un hábito
export const deleteHabitController = async (req, res) => {
  try {
    await deleteHabitService(req.params.id, req.user.id);
    res.json({ message: 'Hábito eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Marcar un hábito como completado
export const completeHabitController = async (req, res) => {
  try {
    const habit = await markHabitCompletedService(req.params.id, req.user.id);
    res.json({ message: 'Hábito marcado como completado', habit });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
