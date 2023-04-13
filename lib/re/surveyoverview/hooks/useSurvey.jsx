import { useContext, useState, useCallback } from 'react';
import { SurveyContext } from '../context';
import axios from 'axios';

export const useSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [errorParticipants, setErrorParticipants] = useState(null);

  const surveyContext = useContext(SurveyContext);
  const { surveyData } = surveyContext;

  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const fetchSelectedParticipants = useCallback(async (ids) => {
    try {
      setLoadingParticipants(true);
      const promises = ids.map((id) =>
        axios.get(`/api/dev/re/participants/${id}`)
      );
      const promiseResult = await Promise.all(promises);
      const participantsResult = promiseResult.map((p) => p.data.data);
      setSelectedParticipants(participantsResult);
    } catch (err) {
      setErrorParticipants(err.response.data);
    } finally {
      setLoadingParticipants(false);
    }
  }, []);

  const sendSurvey = useCallback(
    async (ids) => {
      const requestBody = {
        participantIds: ids,
      };
      try {
        setLoading(true);
        await axios.post(
          `/api/dev/re/surveys/${surveyData.surveyID}/send`,
          requestBody
        );
        setSuccess(true);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    [surveyData]
  );

  const saveSurvey = useCallback(
    async (surveyQuestions) => {
      const requestBody = {
        surveyQuestions,
        surveyData,
      };
      try {
        setLoading(true);
        await axios.post(
          `/api/dev/re/surveys/${surveyData.surveyID}/save`,
          requestBody
        );
        setSuccess(true);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    [surveyData]
  );

  const notifySurvey = useCallback(
    async (ids) => {
      const requestBody = {
        participantIds: ids,
      };
      try {
        setLoading(true);
        await axios.post(
          `/api/dev/re/surveys/${surveyData.surveyID}/notify`,
          requestBody
        );
        setSuccess(true);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    [surveyData]
  );

  const sendAndNotifySurvey = useCallback(
    async (ids) => {
      const requestBody = {
        participantIds: ids,
      };
      try {
        setLoading(true);
        await axios.post(
          `/api/dev/re/surveys/${surveyData.surveyID}/sendandnotify`,
          requestBody
        );
        setSuccess(true);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    },
    [surveyData]
  );

  return {
    error,
    loading,
    success,
    sendSurvey,
    saveSurvey,
    notifySurvey,
    sendAndNotifySurvey,
    ...surveyContext,
    errorParticipants,
    loadingParticipants,
    selectedParticipants,
    fetchSelectedParticipants,
  };
};
