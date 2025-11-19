import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import habitRoutes from './routes/habitRoutes.js';

dotenv.config();
const app = express();

// CORS: permitir frontend de localhost y Vercel
app.use(cors({

  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/habits', habitRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Proyecto Rutinas funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
