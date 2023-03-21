import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAppCredentials } from './useAppCredentials';
import { useAuth } from './useAuth';

export function useMdhAccessToken() {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setProjectId } = useAppCredentials();

  const { error: authError, saveToSession } = useAuth();

  const getTokenAndSaveToSession = useCallback(
    async (serviceAccountId, projectId) => {
      try {
        setLoading(true);
        const { data: result } = await axios.get('/api/mdh/token', {
          params: {
            service_account_id: serviceAccountId,
            project_id: projectId,
          },
        });
        const { access_token, token_expires_at } = result.token_data;
        setAccessToken(access_token);
        await saveToSession(
          serviceAccountId,
          access_token,
          projectId,
          token_expires_at
        );
        console.log('IN HERE');
      } catch (err) {
        setError(authError || err.response.data);
      } finally {
        setLoading(false);
      }
    },
    [setAccessToken]
  );

  return {
    token: accessToken,
    loading,
    error,
    getTokenAndSaveToSession,
  };
}
