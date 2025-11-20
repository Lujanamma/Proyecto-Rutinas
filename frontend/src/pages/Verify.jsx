import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verificando...');
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false); 

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(req => {
      console.log('➡️ Request Axios:', req);
      return req;
    });

    const responseInterceptor = axios.interceptors.response.use(
      res => {
        console.log('✅ Response Axios:', res);
        return res;
      },
      err => {
        console.error('❌ Error Axios:', err.response || err);
        return Promise.reject(err);
      }
    );

    const verifyAccount = async () => {
      if (verified) return; 
      console.log('Iniciando verificación con token:', token);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify/${token}`
        );
        console.log('Respuesta recibida del backend:', response);
        setStatus(response.data.message || 'Cuenta verificada correctamente');
        setError(false);

        // Redirigir al login después de 3 segundos siempre y cuando la verificación sea exitosa
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        console.error(' Error en la verificación:', err.response || err);
        setStatus(err.response?.data?.message || 'Error verificando la cuenta.');
        setError(true);
      } finally {
        setVerified(true); 
      }
    };

    if (token) verifyAccount();

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, verified, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{status}</h2>
      {error ? (
        <p>
          Error verificando la cuenta. Esto puede deberse a un token inválido o expirado. 
          <br />
          Intenta registrarte nuevamente o contacta soporte.
        </p>
      ) : (
        <div>
          <p>Cuenta verificada correctamente.</p>
          <p>Serás redirigido al login en 3 segundos...</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
