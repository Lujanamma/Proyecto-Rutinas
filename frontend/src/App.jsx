import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Login from '../src/pages/Login.jsx';
import Register from './pages/Register.jsx';
import Habits from '../src/Habits.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Vigila cambios en localStorage por logout/login en otras pestañas
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/habits" : "/login"} replace />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route
        path="/habits"
        element={
          <ProtectedRoute>
            <Habits token={token} />
          </ProtectedRoute>
        }
      />
      {/* Ruta comodín para 404 */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
