import { useContext, useState, useCallback } from 'react';
import { ResponseContext } from '../context/';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useResponse = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [responses, setResponses] = useState([]);

  const responseContext = useContext(ResponseContext);

  const filterResponses = useCallback((startRefreshing) => {
    const { selectedSurveys, selectedParticipants, startTime, endTime } =
      responseContext;
    const participantIds = selectedParticipants.current
      .map((p) => p.value)
      .join(',');
    const surveyIds = selectedSurveys.current.map((s) => s.value).join(',');
    router.replace(
      `/dashboard/responses?participant_ids=${participantIds}&survey_ids=${surveyIds}&start=${startTime.current}&end=${endTime.current}`
    );
    startRefreshing();
  }, []);

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
    setLoading,
    ...responseContext,
    filterResponses,
    fetchResponses,
  };
};
