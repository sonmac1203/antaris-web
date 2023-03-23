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
    console.log(requestBody);
    try {
      setLoading(true);
      const { data: result } = await axios.post(
        `/api/surveys/${surveyData.surveyID}/send`,
        requestBody
      );
      console.log(result);
    } catch (err) {
      console.log(err);
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
