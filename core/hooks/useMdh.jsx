import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export function useMdh() {
  const router = useRouter();

  const [surveys, setSurveys] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginToServiceAccount = useCallback(
    async ({ projectId, serviceAccountId }) => {
      try {
        setError(null);
        setLoading(true);
        await axios.post('/api/mdh/connect', {
          projectId,
          serviceAccountId,
        });
        router.push('/dashboard');
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchAllSurveys = useCallback(async () => {
    try {
      setLoading(true);
      const { data: result } = await axios.get('/api/mdh/surveys');
      setSurveys(result.data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchParticipants = useCallback(async (ids) => {
    try {
      setLoading(true);
      if (!ids || ids.length === 0) {
        const { data: result } = await axios.get('/api/mdh/participants');
        setParticipants(result.data);
      } else {
        const promises = ids.map((id) => {
          const config = {
            params: {
              participantId: id,
            },
          };
          return axios.get('/api/mdh/participants', config);
        });

        const promiseResult = await Promise.all(promises);
        const participantsResult = promiseResult.map((p) => p.data.data);
        setParticipants(participantsResult);
      }
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    surveys,
    participants,
    loading,
    error,
    fetchAllSurveys,
    fetchParticipants,
    loginToServiceAccount,
  };
}
