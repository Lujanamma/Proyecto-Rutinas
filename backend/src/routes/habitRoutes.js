import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  createHabitController,
  getHabitsController,
  getHabitController,
  updateHabitController,
  deleteHabitController,
  completeHabitController,
} from '../controllers/habitController.js';

const router = express.Router();

// CRUD de hábitos
router.post('/', authenticate, createHabitController);        // Crear hábito
router.get('/', authenticate, getHabitsController);           // Listar todos
router.get('/:id', authenticate, getHabitController);         // Obtener por ID
router.put('/:id', authenticate, updateHabitController);      // Actualizar
router.delete('/:id', authenticate, deleteHabitController);   // Eliminar

// Marcar hábito como completado
router.post('/complete/:id', authenticate, completeHabitController);

export default router;
