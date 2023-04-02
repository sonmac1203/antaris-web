import { useContext, useState, useCallback } from 'react';
import { ParticipantContext } from '../context/';
import axios from 'axios';

export const useParticipant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const participantContext = useContext(ParticipantContext);
  const { participantData } = participantContext;

  // const sendSurvey = useCallback(
  //   async (ids) => {
  //     const requestBody = {
  //       participantIds: ids,
  //     };
  //     try {
  //       setLoading(true);
  //       await axios.post(
  //         `/api/dev/re/surveys/${surveyData.surveyID}/send`,
  //         requestBody
  //       );
  //       setSuccess(true);
  //     } catch (err) {
  //       setError(err.response.data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [surveyData]
  // );

  // const saveSurvey = useCallback(
  //   async (surveyQuestions) => {
  //     const requestBody = {
  //       surveyQuestions,
  //       surveyData,
  //     };
  //     try {
  //       setLoading(true);
  //       await axios.post(
  //         `/api/dev/re/surveys/${surveyData.surveyID}/save`,
  //         requestBody
  //       );
  //       setSuccess(true);
  //     } catch (err) {
  //       setError(err.response.data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [surveyData]
  // );

  return {
    error,
    loading,
    success,
    ...participantContext,
  };
};
