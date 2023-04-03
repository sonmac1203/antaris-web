import { useState, useCallback } from 'react';
import axios from 'axios';

export function useMdh() {
  const [surveys, setSurveys] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [participantLoading, setParticipantLoading] = useState(false);
  const [participantError, setParticipantError] = useState(null);

  const [selectedParticipants, setSelectedParticipants] = useState([]);

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

  const fetchAllParticipants = useCallback(async () => {
    try {
      setParticipantLoading(true);
      const { data: result } = await axios.get('/api/dev/re/participants');
      setParticipants(result.data);
    } catch (err) {
      setParticipantError(err.response.data);
    } finally {
      setParticipantLoading(false);
    }
  }, []);

  const fetchSelectedParticipants = useCallback(async (ids) => {
    try {
      setLoading(true);
      const promises = ids.map((id) =>
        axios.get(`/api/dev/re/participants/${id}`)
      );
      const promiseResult = await Promise.all(promises);
      const participantsResult = promiseResult.map((p) => p.data.data);
      setSelectedParticipants(participantsResult);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    surveys,
    participants,
    selectedParticipants,
    loading,
    error,
    participantLoading,
    participantError,
    fetchAllSurveys,
    fetchAllParticipants,
    fetchSelectedParticipants,
  };
}
