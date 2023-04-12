import { useContext, useState, useCallback } from 'react';
import { ParticipantDashboardContext } from '../context';
import axios from 'axios';

export const useParticipantDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const participantDashboardContext = useContext(ParticipantDashboardContext);

  const saveNewParticipants = useCallback(async (requestBody) => {
    console.log(requestBody);
    try {
      setLoading(true);
      await axios.post('/api/dev/amz/participants/save', requestBody);
      setSuccess(true);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    ...participantDashboardContext,
    saveNewParticipants,
    loading,
    error,
    success,
  };
};
