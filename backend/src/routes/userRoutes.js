import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta protegida de ejemplo
router.get('/profile', authenticate, async (req, res) => {
  res.json({ message: 'Accediste a la información del perfil!', userId: req.user.id });
});

export default router;
