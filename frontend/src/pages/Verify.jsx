import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('Verificando...');
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false); // evita reintentos

  useEffect(() => {
    // Interceptores para capturar todos los requests/responses
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
      if (verified) return; // evita segunda llamada si ya se verificó
      console.log('🔹 Iniciando verificación con token:', token);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify/${token}`
        );
        console.log('🔹 Respuesta recibida del backend:', response);
        setStatus(response.data.message || 'Cuenta verificada correctamente ✅');
        setError(false);
      } catch (err) {
        console.error('🔹 Error en la verificación:', err.response || err);
        setStatus(err.response?.data?.message || 'Error verificando la cuenta.');
        setError(true);
      } finally {
        setVerified(true); // marca como verificado para no repetir
      }
    };

    if (token) verifyAccount();

    // Limpiar interceptores al desmontar
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, verified]);

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
