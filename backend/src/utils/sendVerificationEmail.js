import nodemailer from 'nodemailer';

const sendVerificationEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const frontendURL =
    process.env.FRONTEND_URL_PROD ||
    process.env.FRONTEND_URL_LOCAL ||
    'http://localhost:5173';

  const verificationUrl = `${frontendURL}/verify/${token}`;

  try {
    await transporter.sendMail({
      from: `"Proyecto Rutinas" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verifica tu cuenta ✔️',
      html: `
        <h2>Bienvenido/a a Proyecto Rutinas</h2>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationUrl}" target="_blank">Verificar cuenta</a>
      `,
    });
    console.log(`✅ Email de verificación enviado correctamente a: ${to}`);
  } catch (error) {
    console.error(`❌ Error al enviar correo a ${to}:`, error);
  }
};

export default sendVerificationEmail;
