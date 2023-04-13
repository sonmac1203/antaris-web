import { useMemo } from 'react';
import { ParticipantContext } from '../../context';

export const ParticipantPageProvider = ({ children, value }) => {
  const { participantData, assignedSurveys, participantResponses } = value;
  const participantPageContextValue = useMemo(
    () => ({
      participantData,
      assignedSurveys,
      participantResponses,
    }),
    [participantData, assignedSurveys, participantResponses]
  );

  return (
    <ParticipantContext.Provider value={participantPageContextValue}>
      {children}
    </ParticipantContext.Provider>
  );
};
