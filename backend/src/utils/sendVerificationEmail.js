import fetch from "node-fetch";

const sendVerificationEmail = async (to, token) => {
  const frontendURL =
    process.env.FRONTEND_URL_PROD ||
    process.env.FRONTEND_URL_LOCAL ||
    "http://localhost:5173";

  const verificationUrl = `${frontendURL}/verify/${token}`;

  console.log(`📨 Enviando correo de verificación a ${to} (vía Brevo API)`);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Proyecto Rutinas", email: "no-reply@proyecto-rutinas.com" },
        to: [{ email: to }],
        subject: "Verifica tu cuenta ✔️",
        htmlContent: `
          <h2>Bienvenido/a a Proyecto Rutinas</h2>
          <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
          <a href="${verificationUrl}" target="_blank">Verificar cuenta</a>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error al enviar correo:", errorText);
    } else {
      console.log(`✅ Email enviado correctamente a: ${to}`);
    }
  } catch (error) {
    console.error("❌ Error en la solicitud HTTP a Brevo:", error);
  }
};

export default sendVerificationEmail;
