import { useMemo } from 'react';
import { DashboardContext } from '../../context';

export const DashboardProvider = ({ value, children }) => {
  const dashboardContextValue = useMemo(
    () => ({
      ...value,
    }),
    [value.surveys, value.participants]
  );

  return (
    <DashboardContext.Provider value={dashboardContextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
