import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import habitRoutes from './routes/habitRoutes.js';

dotenv.config();
const app = express();

// CORS configurado solo para tu frontend
const allowedOrigins = ['https://proyecto-rutinas.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido para este origen'));
    }
  },
  credentials: false, // no usamos cookies
}));

app.use(express.json());
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/habits', habitRoutes);

app.get('/', (req, res) => res.send('Servidor Proyecto Rutinas funcionando 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
