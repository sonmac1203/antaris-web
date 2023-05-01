import { useContext } from 'react';
import { useSWRAxios } from '@/core/hooks';
import { DashboardContext } from '../context';

export const useDashboard = () => {
  const dashboardContext = useContext(DashboardContext);

  const useParticipantsData = () => {
    const apiResponse = useSWRAxios(['/api/dev/re/participants', {}]);
    return apiResponse;
  };

  const useSurveysData = () => {
    const apiResponse = useSWRAxios(['/api/dev/re/surveys', {}]);
    return apiResponse;
  };

  return { ...dashboardContext, useParticipantsData, useSurveysData };
};
