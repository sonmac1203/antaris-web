import { useState, useCallback } from 'react';
import axios from 'axios';

export function useMdh() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllSurveys = useCallback(async (accessToken, projectId) => {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { projectId },
      };
      const { data } = await axios.get('/api/mdh/surveys', config);
      const groupedSurveys = groupSurveyById(data.surveyTasks);
      setSurveys(groupedSurveys);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    surveys,
    loading,
    error,
    fetchAllSurveys,
  };
}

const groupSurveyById = (surveys) => {
  const groupedSurveys = surveys.reduce((acc, survey) => {
    const {
      surveyID,
      participantID,
      participantIdentifier,
      surveyName,
      surveyDisplayName,
      surveyDescription,
    } = survey;
    const group = acc.find((group) => group.surveyID === surveyID);

    if (group) {
      group.participants.push({
        participantID,
        participantIdentifier,
      });
    } else {
      acc.push({
        surveyID,
        surveyName,
        surveyDisplayName,
        surveyDescription,
        participants: [{ participantID, participantIdentifier }],
      });
    }

    return acc;
  }, []);
  return groupedSurveys;
};
