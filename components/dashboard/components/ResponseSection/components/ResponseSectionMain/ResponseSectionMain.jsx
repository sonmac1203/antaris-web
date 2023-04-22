import { ResponseListSkeleton, ErrorMessage } from './components';
import { getResponseFilterFromSession } from '@/core/utils';
import { useResponse } from '@/lib/re/dashboard';
import { ActivityCard } from '../ActivityCard';
import { FilterBar } from '../FilterBar';
import { Provider } from '../Provider';

const ResponseSectionMain = () => {
  const filter = getResponseFilterFromSession();
  const { data: result, error, loading, mutate } = useResponse(filter);

  const gapStyle = {
    gap: '2rem',
  };

  return (
    <Provider
      value={{ startRefreshing: mutate, responses: result?.data || [] }}
    >
      <FilterBar />
      {error ? (
        <ErrorMessage text='Could not load responses.' />
      ) : loading ? (
        <ResponseListSkeleton />
      ) : result?.data.length === 0 ? (
        <ErrorMessage text='No responses found.' />
      ) : (
        <div className='d-flex flex-column mt-3' style={gapStyle}>
          {result?.data.map((item, key) => (
            <ActivityCard item={item} key={key} />
          ))}
        </div>
      )}
    </Provider>
  );
};

export default ResponseSectionMain;
