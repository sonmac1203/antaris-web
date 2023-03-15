import { useState, useMemo } from 'react';
import { AppContext } from '@/core/context/AppContext';

export const AppContextProvider = ({ children }) => {
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');

  const appContextValue = useMemo(
    () => ({
      projectId,
      setProjectId,
      setError,
    }),
    [projectId, setProjectId, setError]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
