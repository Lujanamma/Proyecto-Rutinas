import { registerUser, loginUser, verifyUserAccount } from '../services/userService.js';

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyUserController = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Token recibido para verificación:", token); // <-- LOG agregado
    const result = await verifyUserAccount(token);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error verificando usuario:", error.message); // <-- LOG agregado
    res.status(400).json({ message: error.message });
  }
};
