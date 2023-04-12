import { useMemo } from 'react';
import { ParticipantDashboardContext } from '@/core/context';

export const ParticipantDashboardProvider = ({ value, children }) => {
  const participantDashboardContextValue = useMemo(
    () => ({
      ...value,
    }),
    [value.participantData]
  );

  return (
    <ParticipantDashboardContext.Provider
      value={participantDashboardContextValue}
    >
      {children}
    </ParticipantDashboardContext.Provider>
  );
};
