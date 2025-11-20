import { useEffect, useState } from 'react';
import api from '../src/api.js';
import '../src/styles/Habits.css';
import ThemeToggle from '../src/components/ThemeToggle.jsx';

export default function Habits({ token }) {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [emoji, setEmoji] = useState('🌱');
  const [userName, setUserName] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchHabits();
    setFadeIn(true);
    const storedEmail = localStorage.getItem('email');
    setUserName(storedEmail ? storedEmail.split('@')[0] : 'usuario');
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await api.get('/habits', config);
      setHabits(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
console.log("Emoji elegido:", emoji);
 const handleAddHabit = async (e) => {
  e.preventDefault();
  try {
 
    const habitData = { title, description, frequency, emoji };
    const res = await api.post('/habits', habitData, config);

setHabits([...habits, { ...res.data, emoji }]);
    setTitle('');
    setDescription('');
    setFrequency('daily');
    setEmoji('🌱'); 
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  }
};


  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este hábito?')) return;
    try {
      await api.delete(`/habits/${id}`, config);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const emojiList = ['🌱', '💧', '🔥', '🧘', '📚', '🏃‍♀️', '🍎', '☀️', '🎨', '💤'];

  return (
    <div className={`habits-container ${fadeIn ? 'fade-in' : ''}`}>
      <header className="habits-header">
        <h1>Bienvenido, {userName} 👋</h1>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <ThemeToggle />
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="habit-section">
        <h2>Mis hábitos</h2>

        <form onSubmit={handleAddHabit} className="habit-form">
          <div className="emoji-picker">
  {emojiList.map((em) => (
    <button
      key={em}
      type="button"
      className={`emoji-btn ${emoji === em ? 'selected' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        setEmoji(em);
      }}
    >
      {em}
    </button>
  ))}
</div>

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Diario</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </select>
          <button type="submit" className="add-btn">
            Agregar hábito
          </button>
        </form>

        <ul className="habit-list">
          {habits.map((h) => (
  <li key={h._id || h.title} className="habit-item">
    <div>
      <span className="habit-emoji">
        {h.emoji ? h.emoji : '🌱'}
      </span>{' '}
      <strong>{h.title}</strong> — {h.description || 'Sin descripción'} ({h.frequency})
    </div>
    <button
      className="delete-btn"
      onClick={() => handleDelete(h._id)}
    >
      Eliminar
    </button>
  </li>
))}
        </ul>
      </section>
    </div>
  );
}
