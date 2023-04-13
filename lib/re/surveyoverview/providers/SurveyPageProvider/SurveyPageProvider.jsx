import { useMemo, useState } from 'react';
import { SurveyContext } from '@/core/context';
import { useRouter } from 'next/router';

export const SurveyPageProvider = ({ children, value }) => {
  const { surveyData } = value;

  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(true);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  const startRefreshing = () => setIsRefreshing(true);
  const stopRefreshing = () => setIsRefreshing(false);

  const surveyContextValue = useMemo(
    () => ({
      isRefreshing,
      refreshData,
      startRefreshing,
      stopRefreshing,
      surveyData,
      participantsData: surveyData.participants,
    }),
    [isRefreshing, surveyData, surveyData.participants]
  );

  return (
    <SurveyContext.Provider value={surveyContextValue}>
      {children}
    </SurveyContext.Provider>
  );
};
