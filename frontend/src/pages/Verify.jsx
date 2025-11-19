import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('Verificando...');
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify/${token}`
        );
        setStatus(response.data.message);
        setError(false);
      } catch (err) {
        console.error(err);
        setStatus(err.response?.data?.message || 'Error verificando la cuenta.');
        setError(true);
      }
    };

    if (token) {
      verifyAccount();
    }
  }, [token]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{status}</h2>
      {error ? (
        <p>Si el problema persiste, intenta registrarte nuevamente o contacta soporte.</p>
      ) : (
        <p>Ahora puedes iniciar sesión con tu cuenta verificada.</p>
      )}
    </div>
  );
};

export default Verify;
