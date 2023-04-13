import { useMemo } from 'react';
import { ParticipantDashboardContext } from '../../context';

export const ParticipantDashboardProvider = ({ value, children }) => {
  const contextValue = useMemo(
    () => ({
      ...value,
    }),
    [value.participantData]
  );

  return (
    <ParticipantDashboardContext.Provider value={contextValue}>
      {children}
    </ParticipantDashboardContext.Provider>
  );
};
