import { useMemo, useRef } from 'react';
import { ResponseSectionContext } from '../../context';

export const Provider = ({ children, value }) => {
  const selectedSurveys = useRef([]);
  const selectedParticipants = useRef([]);
  const startTime = useRef('');
  const endTime = useRef('');

  const setSelectedSurveys = (surveys) => (selectedSurveys.current = surveys);
  const setSelectedParticipants = (participants) =>
    (selectedParticipants.current = participants);
  const setStartTime = (time) => (startTime.current = time);
  const setEndTime = (time) => (endTime.current = time);

  const responseSectionContextValue = useMemo(
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
    [selectedSurveys, selectedParticipants, startTime, endTime, value.responses]
  );

  return (
    <ResponseSectionContext.Provider value={responseSectionContextValue}>
      {children}
    </ResponseSectionContext.Provider>
  );
};
