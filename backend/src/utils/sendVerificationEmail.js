import nodemailer from 'nodemailer';

const sendVerificationEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

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

  // Este console.log debe ir aquí, dentro de la función
  console.log(`✅ Intentando enviar correo de verificación a ${to} con link: ${verificationUrl}`);
};

export default sendVerificationEmail;
