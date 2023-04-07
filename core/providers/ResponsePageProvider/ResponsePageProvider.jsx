import { useRef, useMemo } from 'react';
import { ResponseContext } from '@/core/context';

export const ResponsePageProvider = ({ value, children }) => {
  const selectedSurveys = useRef([]);
  const selectedParticipants = useRef([]);
  const startTime = useRef('');
  const endTime = useRef('');

  const setSelectedSurveys = (surveys) => (selectedSurveys.current = surveys);
  const setSelectedParticipants = (participants) =>
    (selectedParticipants.current = participants);
  const setStartTime = (time) => (startTime.current = time);
  const setEndTime = (time) => (endTime.current = time);

  const responsePageContextValue = useMemo(
    () => ({
      ...value,
      selectedSurveys,
      selectedParticipants,
      startTime,
      endTime,
      setSelectedSurveys,
      setSelectedParticipants,
      setStartTime,
      setEndTime,
    }),
    [
      value.responsesData,
      value.participantsData,
      value.surveysData,
      selectedSurveys,
      selectedParticipants,
      startTime,
      endTime,
    ]
  );

  return (
    <ResponseContext.Provider value={responsePageContextValue}>
      {children}
    </ResponseContext.Provider>
  );
};
