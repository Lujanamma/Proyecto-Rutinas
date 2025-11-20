import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";
import "../styles/Auth.css";

export default function Register({ setToken }) {
  const [name, setName] = useState(""); // 👈 agregado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 👇 ahora enviamos también el nombre
      const res = await api.post("/auth/register", { name, email, password });
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
          {/* 👇 campo nuevo */}
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
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
