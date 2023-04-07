import { useResponse } from '@/core/hooks';
import { PageSectionWrapper } from '@/core/components';
import { useEffect, useCallback, useState } from 'react';
import {
  ActivityCard,
  Provider,
  FilterBar,
  FilterButton,
  ExportButton,
} from './components';

export const ResponseSection = () => {
  const { error, loading, responses, fetchResponses } = useResponse();

  const [refreshKey, setRefreshKey] = useState(0);
  const startRefreshing = () => setRefreshKey((oldKey) => oldKey + 1);

  const fetchAllResponses = useCallback(
    async (filter) => {
      await fetchResponses(filter);
    },
    [fetchResponses, refreshKey]
  );

  useEffect(() => {
    const filter = getFromSession();
    fetchAllResponses(filter);
  }, [refreshKey]);

  return (
    <Provider value={{ startRefreshing, responses }}>
      <PageSectionWrapper title='Responses'>
        <FilterBar />
        <div>
          <FilterButton />
        </div>
        <div className='d-flex'>
          <ExportButton />
        </div>
        {error
          ? 'Could not load responses.'
          : loading
          ? 'Loading responses...'
          : responses.length === 0
          ? 'No responses found.'
          : responses.map((item, key) => (
              <ActivityCard item={item} key={key} />
            ))}
      </PageSectionWrapper>
    </Provider>
  );
};

const getFromSession = () => {
  const dataFromSession = sessionStorage.getItem('response_filter');
  const responseQuery = dataFromSession ? JSON.parse(dataFromSession) : {};
  return responseQuery;
};
