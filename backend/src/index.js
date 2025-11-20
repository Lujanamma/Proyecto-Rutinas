import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import habitRoutes from './routes/habitRoutes.js';

dotenv.config();
const app = express();


app.use(express.json());


const allowedOrigins = ['http://localhost:5173', 'https://proyecto-rutinas.vercel.app']; // Agregado localhost para desarrollo
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS bloqueado para origin:', origin);
      callback(new Error('CORS no permitido'));
    }
  },
  credentials: true,
}));


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/habits', habitRoutes);


app.get('/', (req, res) => {
  console.log('✅ Ruta / accedida');
  res.send('Servidor Proyecto Rutinas funcionando 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
