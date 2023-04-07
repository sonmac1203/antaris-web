import { useContext } from 'react';
import { DashboardContext } from '../context';

export const useDashboard = () => {
  const dashboardContext = useContext(DashboardContext);
  return { ...dashboardContext };
};
