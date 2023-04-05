import { useContext, useState, useCallback } from 'react';
import { ResponseContext } from '../context/';
import axios from 'axios';

export const useResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const responseContext = useContext(ResponseContext);

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
    ...responseContext,
  };
};
