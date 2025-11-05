import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";
import "../styles/Auth.css";

export default function Register({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { email, password });
      alert("Registro exitoso. Verifica tu cuenta antes de iniciar sesión.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        <div className="auth-footer">
          <p>
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
