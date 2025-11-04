import { useState } from 'react';
import api from '../src/api.js';
import { useNavigate, Link } from 'react-router-dom';
import '../src/styles/App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/habits'); // redirige a la página de hábitos
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>¿No tienes cuenta? <Link to="/register">Registrarse</Link></p>
    </div>
  );
}
