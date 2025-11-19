import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { createUser, findUserByEmail, verifyUser } from '../repositories/userRepository.js';
import sendVerificationEmail from '../utils/sendVerificationEmail.js';

// Registro de usuario
export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('El correo ya está registrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    verificationToken,
  });

  // Intentar enviar mail de verificación sin romper la app
  try {
    console.log("🚀 Intentando enviar email de verificación a:", email);
    await sendVerificationEmail(email, verificationToken);
    console.log("✅ Email de verificación enviado correctamente");
  } catch (error) {
    console.error("❌ Error enviando email de verificación:", error.message);
  }

  return { message: 'Usuario registrado. Revisa tu correo para verificar tu cuenta.' };
};

// Login de usuario
export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Credenciales inválidas');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Credenciales inválidas');

  if (!user.verified) throw new Error('Cuenta no verificada. Revisa tu correo.');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};

// Verificación de usuario
export const verifyUserAccount = async (token) => {
  const user = await verifyUser(token);
  if (!user) throw new Error('Token inválido o expirado');
  return { message: 'Cuenta verificada correctamente.' };
};
