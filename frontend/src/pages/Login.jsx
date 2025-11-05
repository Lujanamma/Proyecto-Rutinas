import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";
import "../styles/Auth.css";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/habits");
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Iniciar sesión</h2>
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
          <button type="submit">Entrar</button>
        </form>
        <div className="auth-footer">
          <p>
            ¿No tenés cuenta? <Link to="/register">Registrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
