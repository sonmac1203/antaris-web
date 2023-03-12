import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCredentials } from '@/core/hooks';

export const HistorySection = ({ surveyId, participantIdentifier }) => {
  const { projectId } = useCredentials();
  const [historyData, setHistoryData] = useState(null);

  console.log(projectId);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    const fetchHistory = async () => {
      try {
        const config = {
          params: {
            project_id: projectId,
            participant_identifier: participantIdentifier,
            survey_id: surveyId,
          },
        };
        const { data } = await axios.get(`/api/surveys/get_history`, config);
        if (data.success) {
          setHistoryData(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, [projectId]);

  return (
    <section>
      <h2>History</h2>
      {historyData ? (
        <>
          Assigned at: {historyData.assigned_at} <br />
          Alexa status: {historyData.alexa_status}
        </>
      ) : (
        <>No history was found</>
      )}
    </section>
  );
};
