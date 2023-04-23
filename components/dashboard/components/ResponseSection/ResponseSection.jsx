import { ExportButton, ResponseList, FilterBar, Provider } from './components';
import { getResponseFilterFromSession } from '@/core/utils';
import { PageSectionWrapper } from '@/core/components';
import { useResponse } from '@/lib/re/dashboard';

const ResponseSection = () => {
  const filter = getResponseFilterFromSession();
  const { data: result, error, loading, mutate } = useResponse(filter);

  return (
    <Provider
      value={{
        startRefreshing: mutate,
        responses: result?.data || [],
        loading,
        error,
      }}
    >
      <PageSectionWrapper
        title='Responses'
        topRightOptions={[<ExportButton key={1} />]}
      >
        <FilterBar />
        <ResponseList />
      </PageSectionWrapper>
    </Provider>
  );
};

export default ResponseSection;
