import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await api.get('/habits');
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addHabit = async () => {
    try {
      await api.post('/habits', { title });
      setTitle('');
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Mis hábitos</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nuevo hábito" />
      <button onClick={addHabit}>Agregar</button>
      <ul>
        {habits.map(h => (
          <li key={h._id}>{h.title}</li>
        ))}
      </ul>
    </div>
  );
}
