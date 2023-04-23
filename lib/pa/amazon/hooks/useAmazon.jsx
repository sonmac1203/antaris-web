import { useState, useCallback } from 'react';
import axios from 'axios';

export const useAmazon = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [participants, setParticipants] = useState([]);

  const resetStates = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  const unlinkAndDeleteSkill = useCallback(async (email) => {
    try {
      setLoading(true);
      await axios.post('/api/dev/amz/delete', {}, { params: { email } });
      setSuccess(true);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    success,
    participants,
    unlinkAndDeleteSkill,
    resetStates,
  };
};
