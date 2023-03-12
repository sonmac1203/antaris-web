import React, { useEffect, useMemo, useState } from 'react';
import { CredentialsContext } from '@/core/context';

export const DashboardProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken') || '');
    setProjectId(localStorage.getItem('projectId') || '');
  }, []);

  const CredentialsContextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      projectId,
      setProjectId,
    }),
    [accessToken, projectId]
  );
  return (
    <CredentialsContext.Provider value={CredentialsContextValue}>
      {children}
    </CredentialsContext.Provider>
  );
};
