import { registerUser, loginUser, verifyUserAccount } from '../services/userService.js';

export const registerUserController = async (req, res) => {
  try {
    console.log('Datos recibidos en registro:', req.body);
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    const result = await registerUser(name, email, password);
    console.log('Usuario registrado exitosamente:', email);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error en registro:', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    console.log('Intento de login para:', req.body.email);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }
    
    const result = await loginUser(email, password);
    console.log('Login exitoso para:', email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const verifyUserController = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await verifyUserAccount(token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error verificando la cuenta.' });
  }
};
