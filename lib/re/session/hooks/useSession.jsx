import { refreshSession, getSessionPayload } from '../utils';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export function useSession() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInToServiceAccount = useCallback(
    async ({ password, serviceAccountId }) => {
      try {
        setError(null);
        setLoading(true);
        await axios.post('/api/dev/re/session/connect', {
          password,
          serviceAccountId,
        });
        router.push('/re/dashboard');
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signUpWithServiceAccount = useCallback(
    async ({ projectId, serviceAccountId, password, privateKey }) => {
      try {
        setError(null);
        setLoading(true);
        await axios.post('/api/dev/re/session/register', {
          projectId,
          serviceAccountId,
          password,
          privateKey,
        });
        router.push('/re/dashboard');
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getSessionPayloadAsClient = useCallback(async () => {
    const payload = await getSessionPayload();
    return payload;
  }, []);

  const refreshSessionPayload = useCallback(async (redirectPath) => {
    await refreshSession(redirectPath);
  }, []);

  return {
    loading,
    error,
    signInToServiceAccount,
    signUpWithServiceAccount,
    getSessionPayloadAsClient,
    refreshSessionPayload,
  };
}
