import { useState, useCallback } from 'react';
import axios from 'axios';

export const useResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState([]);

  const fetchResponses = useCallback(async (props) => {
    try {
      setLoading(true);
      const { data: result } = await axios.get('/api/dev/skill/responses', {
        params: props,
      });
      setResponses(result.data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    responses,
    fetchResponses,
  };
};
