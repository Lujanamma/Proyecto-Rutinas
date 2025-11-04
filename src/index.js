import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Proyecto Rutinas funcionando correctamente 🚀');
});

// Conectar a MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
