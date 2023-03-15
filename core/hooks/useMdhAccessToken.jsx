import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAppCredentials } from './useAppCredentials';
import { useAuth } from './useAuth';

export function useMdhAccessToken() {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setProjectId } = useAppCredentials();

  const { logIn } = useAuth();

  const getTokenAndDoAuth = useCallback(
    async (serviceAccountId, projectId) => {
      try {
        setLoading(true);
        const { data: result } = await axios.get('/api/mdh/get_access_token', {
          params: {
            service_account_id: serviceAccountId,
            project_id: projectId,
          },
        });

        const { access_token: token } = result.token_data;

        setAccessToken(token);
        setProjectId(projectId);

        await logIn(serviceAccountId);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    [setProjectId]
  );

  const refreshToken = useCallback(() => {}, []);

  return {
    token: accessToken,
    loading,
    error,
    getTokenAndDoAuth,
    refreshToken,
  };
}
