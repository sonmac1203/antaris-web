import { useContext, useCallback } from 'react';
import { ResponseSectionContext } from '../context';

export const useFilterBar = () => {
  const responseSectionContext = useContext(ResponseSectionContext);

  const filterResponses = useCallback(() => {
    const { selectedItems, startTime, endTime, startRefreshing } =
      responseSectionContext;

    const selectedSurveys = selectedItems.current.filter(
      (i) => i.type === 'survey'
    );
    const selectedParticipants = selectedItems.current.filter(
      (i) => i.type === 'participant'
    );

    const participantIds = selectedParticipants.map((p) => p.value).join(',');
    const surveyIds = selectedSurveys.map((s) => s.value).join(',');
    const query = {
      participant_ids: participantIds,
      survey_ids: surveyIds,
      start: startTime.current,
      end: endTime.current,
    };
    sessionStorage.setItem('response_filter', JSON.stringify(query));
    startRefreshing();
  }, []);

  return { ...responseSectionContext, filterResponses };
};
