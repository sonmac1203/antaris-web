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
    console.log('IM here');
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

  const logIn = useCallback(async (serviceAccountId) => {
    try {
      setLoading(true);
      const { data: authResult } = await axios.post(
        '/api/auth/get_auth_token',
        {
          key: serviceAccountId,
        }
      );

      localStorage.setItem('auth_token', authResult.data.authToken);
      router.push('/dash');
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(() => {
    resetAuthStates();
    localStorage.clear();
    router.push('/');
  }, []);

  return {
    loading,
    error,
    logIn,
    logOut,
    verifyAuthentication,
    isAuthenticated,
    authData,
  };
}
