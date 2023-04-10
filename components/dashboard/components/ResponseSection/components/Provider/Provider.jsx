import { useMemo, useRef } from 'react';
import { ResponseSectionContext } from '../../context';

export const Provider = ({ children, value }) => {
  const selectedSurveys = useRef([]);
  const selectedParticipants = useRef([]);
  const startTime = useRef('');
  const endTime = useRef('');
  const selectedItems = useRef([]);

  const setSelectedSurveys = (surveys) => (selectedSurveys.current = surveys);
  const setSelectedParticipants = (participants) =>
    (selectedParticipants.current = participants);
  const setStartTime = (time) => (startTime.current = time);
  const setEndTime = (time) => (endTime.current = time);
  const setSelectedItems = (items) => (selectedItems.current = items);

  const responseSectionContextValue = useMemo(
    () => ({
      ...value,
      selectedSurveys,
      selectedParticipants,
      selectedItems,
      startTime,
      endTime,
      setSelectedSurveys,
      setSelectedParticipants,
      setSelectedItems,
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
