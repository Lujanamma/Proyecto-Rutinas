import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  createHabitController,
  getHabitsController,
  getHabitController,
  updateHabitController,
  deleteHabitController,
} from '../controllers/habitController.js';

const router = express.Router();

// CRUD de hábitos
router.post('/', authenticate, createHabitController);
router.get('/', authenticate, getHabitsController);
router.get('/:id', authenticate, getHabitController);
router.put('/:id', authenticate, updateHabitController);
router.delete('/:id', authenticate, deleteHabitController);

export default router;
