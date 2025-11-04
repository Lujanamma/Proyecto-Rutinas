import { useState } from 'react';
import api from '../src/api.js';
import { useNavigate, Link } from 'react-router-dom';
import '../src/styles/App.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registro exitoso! Revisa tu correo para verificar la cuenta.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></p>
    </div>
  );
}
