import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository.js';

export const authenticate = async (req, res, next) => {
  try {
    console.log('Authorization header recibido:', req.headers.authorization); // 🔹 agrega esto

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token faltante o inválido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // guardamos info del usuario en req.user
    next();
  } catch (error) {
    console.log('Error en authenticate:', error.message); 
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
