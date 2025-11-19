import { registerUser, loginUser, verifyUserAccount } from '../services/userService.js';

// Registro de usuario
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    console.log("Usuario registrado correctamente:", email); // LOG agregado
    res.status(201).json(result);
  } catch (error) {
    console.error("Error registrando usuario:", error.message); // LOG agregado
    res.status(400).json({ message: error.message });
  }
};

// Login de usuario
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    console.log("Usuario logueado correctamente:", email); // LOG agregado
    res.status(200).json(result);
  } catch (error) {
    console.error("Error logueando usuario:", error.message); // LOG agregado
    res.status(400).json({ message: error.message });
  }
};

// Verificación de usuario
export const verifyUserController = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Token recibido para verificación:", token); // LOG agregado
    const result = await verifyUserAccount(token);
    console.log("Usuario verificado correctamente con token:", token); // LOG agregado
    res.status(200).json(result);
  } catch (error) {
    console.error("Error verificando usuario:", error.message); // LOG agregado
    res.status(400).json({ message: error.message });
  }
};
