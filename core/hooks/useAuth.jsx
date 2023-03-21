import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState(null);

  const router = useRouter();

  const resetAuthStates = () => {
    setIsAuthenticated(false);
    setAuthData(null);
  };

  const verifyAuthentication = useCallback(async () => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      try {
        console.log('try');
        setLoading(true);
        const { data: result } = await axios.get('/api/auth/verify', {
          headers: { 'x-auth': authToken },
        });
        setIsAuthenticated(true);
        setAuthData(result.data);
      } catch (err) {
        console.log('catch');
        setError(error.response.data);
      } finally {
        console.log('fin');
        setLoading(false);
      }
    }
  }, []);

  const saveToSession = useCallback(
    async (serviceAccountId, accessToken, projectId, tokenExpiresAt) => {
      try {
        setLoading(true);
        await axios.post('/api/auth/token', {
          serviceAccountId,
          accessToken,
          projectId,
          tokenExpiresAt,
        });
        console.log('IM BACK HERE');
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logOut = useCallback(() => {
    resetAuthStates();
    router.push('/api/auth/sign_out');
  }, []);

  return {
    loading,
    error,
    saveToSession,
    logOut,
    verifyAuthentication,
    isAuthenticated,
    authData,
  };
}
