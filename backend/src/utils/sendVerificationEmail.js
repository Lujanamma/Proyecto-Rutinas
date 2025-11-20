import nodemailer from 'nodemailer';

const sendVerificationEmail = async (to, token) => {
  // Crear transporte SMTP para Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    debug: true, // activa logs detallados
    logger: true,
  });

  // Construir la URL correcta del frontend (según entorno)
  const frontendURL =
    process.env.FRONTEND_URL_PROD ||
    process.env.FRONTEND_URL_LOCAL ||
    'http://localhost:5173';

  const verificationUrl = `${frontendURL}/verify/${token}`;

  console.log(
    `📨 Intentando enviar correo de verificación a ${to} con link: ${verificationUrl}`
  );

  try {
    const info = await transporter.sendMail({
      from: `"Proyecto Rutinas" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verifica tu cuenta ✔️',
      html: `
        <h2>Bienvenido/a a Proyecto Rutinas</h2>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationUrl}" target="_blank">Verificar cuenta</a>
      `,
    });

    console.log(`✅ Email de verificación enviado a: ${to}`);
    console.log('📬 Respuesta SMTP:', info.response);
  } catch (error) {
    console.error(`❌ Error al enviar correo a ${to}:`, error);
  }
};

export default sendVerificationEmail;
