import { useEffect, useState, useCallback } from 'react';
import api from '../src/api.js';
import '../src/styles/App.css';

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const token = localStorage.getItem('token');

  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Traer hábitos al cargar la página
  const fetchHabits = useCallback(async () => {
    try {
      const res = await api.get('/habits', config);
      setHabits(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }, [config]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/habits', { title, description, frequency }, config);
      setHabits((prev) => [...prev, res.data]);
      setTitle('');
      setDescription('');
      setFrequency('daily');
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar este hábito?')) return;
    try {
      await api.delete(`/habits/${id}`, config);
      setHabits((prev) => prev.filter((h) => h._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  }, [config]);

  return (
    <div className="container">
      <h1>Mis hábitos</h1>

      <form onSubmit={handleAddHabit} className="habit-form">
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
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="daily">Diario</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
        </select>
        <button type="submit">Agregar hábito</button>
      </form>

      <ul className="habit-list">
        {habits.map((h) => {
          const handleDeleteClick = () => handleDelete(h._id);

          return (
            <li key={h._id} className="habit-item">
              <div>
                <strong>{h.title}</strong> - {h.description || 'Sin descripción'} ({h.frequency})
              </div>
              <div>
                <button onClick={handleDeleteClick} className="delete-btn">
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
