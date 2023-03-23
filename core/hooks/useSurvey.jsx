import { useContext, useState, useCallback } from 'react';
import { SurveyContext } from '../context';
import axios from 'axios';

export const useSurvey = () => {
  const [surveyContent, setSurveyContent] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const surveyContext = useContext(SurveyContext);

  const { surveyData } = surveyContext;

  const sendSurvey = useCallback(async () => {
    const requestBody = {
      participantIds: selectedParticipants,
      surveyContent,
      surveyData,
    };
    try {
      setLoading(true);
      await axios.post(`/api/surveys/${surveyData.surveyID}/send`, requestBody);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, [surveyData, surveyContent]);

  return {
    error,
    loading,
    ...surveyContext,
    setSurveyContent,
    setSelectedParticipants,
    sendSurvey,
  };
};
